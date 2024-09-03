import {
  BUTTON_PRESETS,
  DEFAULT_TITLE_FORMAT,
  DEFUALT_OPTIONS,
  MAX_DATE,
  MIN_DATE,
  OPTION_EVENT_KEYS,
  SIZE_LIST,
  THEME_LIST,
  VIEW_LIST,
  VIEW_ORDER,
} from '@/helpers/consts';
import type { InternalOptions, Options, View } from '@t/options';
import {
  assign,
  forEach,
  isArray,
  isNullish,
  isPlainObject,
  isString,
  isUndefined,
  values,
} from 'doumi';
import {
  assert,
  boolean,
  date,
  define,
  func,
  object,
  optional,
  string,
} from 'superstruct';

export function isView(view: any) {
  return isString(view) && VIEW_LIST.includes(view);
}

export function checkView(view: View, minView: View) {
  return VIEW_ORDER[view] >= VIEW_ORDER[minView];
}

export const schema = object({
  toggleSelected: optional(boolean()),
  shortcuts: optional(boolean()),
  position: optional(
    define('position', (value) => {
      if (isUndefined(value)) return true;
      if (isString(value)) {
        const [pos, edge, ...ele] = value.split('-');
        if (
          !ele.length &&
          ['top', 'bottom', 'left', 'right'].includes(pos) &&
          (isUndefined(edge) || ['start', 'end'].includes(edge))
        )
          return true;
      }
      return false;
    })
  ),
  view: optional(
    define('view', isView || `value must be in ${VIEW_LIST.join(' | ')}`)
  ),
  minView: optional(
    define('minView', isView || `value must be in ${VIEW_LIST.join(' | ')}`)
  ),
  showOtherMonths: optional(boolean()),
  selectOtherMonths: optional(boolean()),
  moveOtherMonths: optional(boolean()),
  navigationLoop: optional(boolean()),
  autoClose: optional(boolean()),
  readOnly: optional(boolean()),
  animation: optional(boolean()),
  inline: optional(boolean()),
  backdrop: optional(boolean()),
  theme: optional(
    define(
      'theme',
      (val) =>
        THEME_LIST.includes(val as any) ||
        `value must be in ${THEME_LIST.join(' | ')}`
    )
  ),
  size: optional(
    define(
      'size',
      (val) =>
        SIZE_LIST.includes(val as any) ||
        `value must be in ${SIZE_LIST.join(' | ')}`
    )
  ),
  titleFormat: optional(
    object({
      days: optional(string()),
      months: optional(string()),
      years: optional(string()),
    })
  ),
  minDate: optional(date()),
  maxDate: optional(date()),
  viewDate: optional(date()),
  selectedDate: optional(date()),
  className: optional(string()),
  dateFormat: optional(string()),
  placeHolder: optional(string()),
  ...OPTION_EVENT_KEYS.reduce(
    (obj, item) => {
      obj[item] = optional(func());
      return obj;
    },
    {} as Record<string, any>
  ),
  locale: optional(object()),
  buttons: optional(
    define('buttons', (value) => {
      if (isUndefined(value)) return true;
      const buttons = isArray(value) ? value : [value];
      return buttons.every((button) => {
        if (isString(button) && BUTTON_PRESETS.includes(button as any))
          return true;
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
    })
  ),
});

export default function checkSchema(options: Options): InternalOptions {
  const opt = assign({}, DEFUALT_OPTIONS, options) as any;
  if (opt.titleFormat === undefined) opt.titleFormat = {};
  if (isPlainObject(opt.titleFormat)) {
    forEach(DEFAULT_TITLE_FORMAT, (value, key) => {
      const titleFormat = opt.titleFormat as Record<string, string>;
      if (isNullish(titleFormat[key])) titleFormat[key] = value;
    });
  }

  // Validate
  assert(opt as any, schema);

  if (!checkView(opt.view, opt.minView)) opt.view = opt.minView;

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
