import _moment from "moment";
// 查询是否是绝对路径链接
export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path);
}
// 获取随机数
export const getRandomNum = function (start, end) {
  return Math.floor((end - start + 1) * Math.random() + start);
};
// 返回是否是https协议
export const isHttps = function () {
  return location.protocol === "https:";
};
// 获取查询参数
export const getQueryArgs = function () {
  let qs = location.search.length > 0 ? location.search.substr(1) : "";
  const args = {};
  const items = qs.length ? qs.split("&") : [];
  let item = null;
  let name = "";
  let value = "";
  for (let i = 0; i < items.length; i++) {
    item = items[i].split("=");
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
};
// 数字千分位
export const numDeal = function (num) {
  if (!num) return;
  let reg = /\d{1,3}(?=(\d{3})+$)/g;
  let numArr = num.toString().split(".");
  let point = numArr[1] ? "." + numArr[1] : "";
  return numArr[0].replace(reg, "$&,") + point;
};
// 对象比较排序
export const compareObj = function (property) {
  return function (a, b) {
    return a[property] - b[property];
  };
};
// 手机号验证
export function isPhone(phone) {
  const pattern = /^1[3456789]\d{9}$/;
  return pattern.test(phone);
}
// 服务电话限定
export function lanLine(phone) {
  const pattern = /^[\d-]+$/;
  return pattern.test(phone);
}
// 中文姓名验证
export function isCnName(name) {
  const pattern = /^[\u4E00-\u9FA5]{2,4}$/;
  return pattern.test(name);
}
// 身份证验证
export function isID(id) {
  const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/;
  return pattern.test(id);
}
// 邮箱验证
export function isEmail(mail) {
  // const pattern = /^([a-zA-Z]|[0-9])(\w|-|\.)+@[a-zA-Z0-9|-]+\.([a-zA-Z]{2,})$/;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(mail);
}
// 证件号码
export function isdocID(id) {
  const pattern = /^([a-zA-Z0-9]|-){8,30}$/;
  return pattern.test(id);
}
// 时间格式化
export function formatDate(date, format) {
  return _moment(date).format(format);
}
// 证件号码
export function isWord(id, length) {
  let arr = length.split("-");
  const pattern = new RegExp(
    `^([\\u4E00-\\u9FA5\\w\\(\\)]){${arr[0]},${arr[1]}}$`
  );
  return pattern.test(id);
}
// 证件号码
export function isWord2(val, length) {
  let arr = length.split("-");
  const pattern = new RegExp(`^\\w{${arr[0]},${arr[1]}}$`);
  return pattern.test(val);
}
// 长度或
export function isWordlen(val, length) {
  let arr = length.split("-");
  // const pattern = /^\w{15}$|^\w{18}$/
  const pattern = new RegExp(`^\\w{${arr[0]}}$|^\\w{${arr[1]}}$`);
  return pattern.test(val);
}
export function isNumber(val) {
  return /\D/g.test(val);
}
export function isBankNumer(val) {
  return /^\d+$/.test(val);
}
export function validRule(type, msg = "不能为空", event = "change") {
  const validFuc = {
    zeo_func: (rule, val, cb) => {
      if (Number(val) === 0) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    pone_func: (rule, val, cb) => {
      if (!isPhone(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    lanLine: (rule, val, cb) => {
      if (!lanLine(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    singlePrecision: (rule, val, cb) => {
      const parttern = /^(([^0][0-9]+|0)\.([0-9]{1,2})$)|^([^0][0-9]+|0)$/;
      if (!parttern.test(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    idCard: (rule, val, cb) => {
      if (!isID(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isdocID: (rule, val, cb) => {
      if (!isdocID(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord2to10: (rule, val, cb) => {
      if (!isWord(val, "2-10")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord2to110: (rule, val, cb) => {
      if (!isWord(val, "2-110")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord15or18: (rule, val, cb) => {
      if (!isWordlen(val, "15-18")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isWord9or10: (rule, val, cb) => {
      if (!isWordlen(val, "9-10")) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isEmial: (rule, val, cb) => {
      if (!isEmail(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    isBankNumer: (rule, val, cb) => {
      if (!isBankNumer(val)) {
        cb(new Error(msg));
      } else {
        cb();
      }
    },
    // 整数
    integer_func: (rule, val, cb) => {
      if (Number.isNaN(Number(val))) {
        return cb(new Error("请输入正确格式"));
      }
      let temp = Number(val);
      if (temp >= 0 && Number.isInteger(temp)) {
        cb();
      } else {
        cb(new Error("请输入正确格式"));
      }
    },
    // 最大输入数量
    maxlength300: (rule, val, cb) => {
      if (val.length > 300) {
        cb(new Error("最多输入300"));
      } else {
        cb();
      }
    },
    // 不允许为纯空格
    noPureSpace: (rule, val, cb) => {
      const pattern = /^[ ]*$/g; //验证是否全都为空格
      if (pattern.test(val)) {
        cb(new Error("不允许输入纯空格"));
      } else {
        cb();
      }
    }
  };
  switch (type) {
    case "requiredOnly":
      return [{ required: true, message: msg, trigger: event }];
    case "requiredOnlyBlur":
      return [{ required: true, message: msg, trigger: "blur" }];
    case "array":
      return [{ type: "array", required: true, message: msg, trigger: event }];
    case "phone":
      return [
        { required: true, message: msg, trigger: event },
        {
          validator: validFuc.pone_func,
          message: "请输入正确手机格式号码",
          trigger: "change"
        }
      ];
    case "lanLine":
      return [
        { required: true, message: msg, trigger: event },
        {
          validator: validFuc.lanLine,
          message: "请输入正确格式号码",
          trigger: "change"
        }
      ];
    case "noZeo":
      return [
        { required: true, message: msg, trigger: event },
        { validator: validFuc.zeo_func, message: "不能为0", trigger: "change" }
      ];
    case "singlePrecision":
      return [
        { required: true, message: msg, trigger: event },
        {
          validator: validFuc.singlePrecision,
          message: "请输入有效数值",
          trigger: "change"
        }
      ];
    case "idCard":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.idCard,
          message: "请输入有效身份证格式",
          trigger: "change"
        }
      ];
    case "docId":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isdocID,
          message: "请输入有效证件格式",
          trigger: "change"
        }
      ];
    case "isWord2to10":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isWord2to10,
          message: "请输入有效格式值",
          trigger: "change"
        }
      ];
    case "isWord2to110":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isWord2to110,
          message: "请输入有效格式值",
          trigger: "change"
        }
      ];
    case "isWord15or18":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isWord15or18,
          message:
            "格式不正确，请正确填写营业执照上的18位统一社会信用代码或15位注册号",
          trigger: "change"
        }
      ];
    case "isWord9or10":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isWord9or10,
          message: "格式不正确",
          trigger: "change"
        }
      ];
    case "email":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isEmial,
          message: "请输入有效邮箱格式",
          trigger: "change"
        }
      ];
    case "integer_func":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.integer_func,
          message: "非法输入",
          trigger: "change"
        }
      ];
    case "isBankNumer":
      return [
        { required: true, message: msg, trigger: "change" },
        {
          validator: validFuc.isBankNumer,
          message: "非法输入",
          trigger: "change"
        }
      ];
  }
}
