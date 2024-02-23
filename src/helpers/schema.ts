import {
  assign,
  forEach,
  isArray,
  isDate,
  isObject,
  isPlainObject,
  isString,
  isUndefined,
  reduce,
  values,
} from 'doumi';
import type { InternalOptions, Options, View } from '@t/options';
import { error } from '@/helpers/util';
import {
  VIEW_ORDER,
  VIEW_LIST,
  MIN_DATE,
  MAX_DATE,
  BUTTON_PRESETS,
} from '@/helpers/consts';

export function isView(view: any) {
  return isString(view) && VIEW_LIST.includes(view);
}

export function checkView(view: View, minView?: View) {
  if (!minView) return true;
  return (
    VIEW_ORDER[view as keyof typeof VIEW_ORDER] >=
    VIEW_ORDER[minView as keyof typeof VIEW_ORDER]
  );
}

const DEFUALT_OPTIONS: Options = {
  toggleSelected: true,
  shortcuts: true,
  position: 'bottom-start',
  view: 'days',
  minView: 'days',
  showOtherMonths: true,
  selectOtherMonths: true,
  moveOtherMonths: true,
  navigationLoop: true,
  autoClose: true,
  readOnly: false,
  animation: true,
  inline: false,
  backdrop: false,
  titleFormat: {},
};

const DEFAULT_TITLE_FORMAT = {
  days: 'MMMM, <i>YYYY</i>',
  months: 'YYYY',
  years: 'YYYY1 - YYYY2',
};

function inValid(key: string, message: string) {
  error(`Invalid options`, `options.${key} should be ${message}`);
}

type ValidationMap = Record<string, (...args: any[]) => any>;

const VALIDATION_MAP: ValidationMap = assign(
  {},
  reduce(
    DEFUALT_OPTIONS,
    (obj, value, key) => {
      const type = typeof value;
      obj[key] = (val: any) => {
        if (typeof val === type) return;
        inValid(key, type);
      };
      return obj;
    },
    {} as ValidationMap
  ),
  ['minDate', 'maxDate', 'selectedDate'].reduce((obj, item) => {
    obj[item] = (val: any) => {
      if (isUndefined(val) || isDate(val)) return;
      inValid(item, 'Date');
    };
    return obj;
  }, {} as ValidationMap),
  {
    className: (val: any) => {
      if (isUndefined(val) || isString(val)) return;
      inValid('className', 'string');
    },
    titleFormat: (val: any) => {
      if (isUndefined(val)) return;
      if (!isObject(val))
        return inValid(
          'titleFormat',
          '{ days?: string; months?: string; years?: string }'
        );
      forEach(DEFAULT_TITLE_FORMAT, (_, key) => {
        const matcher = ['string', 'undefined'];
        if (matcher.includes(typeof val[key])) return;
        inValid(`titleFormat.${key}`, matcher.join(' | '));
      });
    },
    buttons: (val: InternalOptions['buttons']) => {
      if (isUndefined(val)) return;
      const buttons = isArray(val) ? val : [val];
      const isError = !buttons.every((button) => {
        if (isString(button) && BUTTON_PRESETS.includes(button)) return true;
        if (isPlainObject(button)) {
          const { className, id, dataset, attrs, innerHTML } = button;
          const isValidString = [className, id, innerHTML].every(
            (item) => isUndefined(item) || isString(item)
          );
          const isValidObject = [dataset, attrs].every(
            (obj) =>
              isUndefined(obj) || values(obj).every((item) => isString(item))
          );
          return isValidString && isValidObject;
        }
        return false;
      });
      if (isError)
        error(
          'buttons',
          `value must be in ${BUTTON_PRESETS.map((item) => '`' + item + '`').join(' | ')} or button-options object`
        );
    },
  }
);

export default function checkSchema(options: Options): InternalOptions {
  const opt = assign({}, DEFUALT_OPTIONS, options) as any;
  if (!checkView(opt.view, opt.minView)) opt.view = opt.minView;
  if (opt.titleFormat === undefined) opt.titleFormat = {};
  if (isPlainObject(opt.titleFormat)) {
    forEach(DEFAULT_TITLE_FORMAT, (value, key) => {
      const titleFormat = opt.titleFormat as Record<string, string>;
      if (!isString(titleFormat[key])) titleFormat[key] = value;
    });
  }

  // Validate
  forEach(opt, (value, key) => {
    const validator = VALIDATION_MAP[key];
    if (!validator) return;
    validator(value);
  });

  const { minDate, maxDate } = opt;
  const min = !minDate
    ? new Date(MIN_DATE)
    : new Date(Math.max(Number(MIN_DATE), Number(new Date(minDate))));
  const max = !maxDate
    ? new Date(MAX_DATE)
    : new Date(Math.min(Number(new Date(maxDate)), Number(maxDate)));
  min.setHours(0), min.setMinutes(0), min.setSeconds(1);
  max.setHours(23), max.setMinutes(59), max.setSeconds(59);

  opt.minDate = min;
  opt.maxDate = max;

  return opt;
}
