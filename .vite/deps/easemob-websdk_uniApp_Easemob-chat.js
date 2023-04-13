var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../../../../../Users/hfp/Desktop/my练习测试/webim-uniapp-vue3-demo/node_modules/easemob-websdk/uniApp/Easemob-chat.js
var require_Easemob_chat = __commonJS({
  "../../../../../../Users/hfp/Desktop/my练习测试/webim-uniapp-vue3-demo/node_modules/easemob-websdk/uniApp/Easemob-chat.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.websdk = t() : e.websdk = t();
    }(exports, function() {
      return function() {
        var e = { 491: function(e2, t2, r2) {
          var o2, n, i;
          !function(a) {
            "use strict";
            if (null != t2 && "number" != typeof t2.nodeType)
              e2.exports = a();
            else if (null != r2.amdO)
              n = [], void 0 === (i = "function" == typeof (o2 = a) ? o2.apply(t2, n) : o2) || (e2.exports = i);
            else {
              var s = a(), c = "undefined" != typeof self ? self : $.global;
              "function" != typeof c.btoa && (c.btoa = s.btoa), "function" != typeof c.atob && (c.atob = s.atob);
            }
          }(function() {
            "use strict";
            var e3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            function t3(e4) {
              this.message = e4;
            }
            return t3.prototype = new Error(), t3.prototype.name = "InvalidCharacterError", { btoa: function(r3) {
              for (var o3, n2, i2 = String(r3), a = 0, s = e3, c = ""; i2.charAt(0 | a) || (s = "=", a % 1); c += s.charAt(63 & o3 >> 8 - a % 1 * 8)) {
                if ((n2 = i2.charCodeAt(a += 3 / 4)) > 255)
                  throw new t3("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                o3 = o3 << 8 | n2;
              }
              return c;
            }, atob: function(r3) {
              var o3 = String(r3).replace(/[=]+$/, "");
              if (o3.length % 4 == 1)
                throw new t3("'atob' failed: The string to be decoded is not correctly encoded.");
              for (var n2, i2, a = 0, s = 0, c = ""; i2 = o3.charAt(s++); ~i2 && (n2 = a % 4 ? 64 * n2 + i2 : i2, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
                i2 = e3.indexOf(i2);
              return c;
            } };
          });
        }, 168: function(e2) {
          e2.exports = r2;
          var t2 = null;
          try {
            t2 = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
          } catch (e3) {
          }
          function r2(e3, t3, r3) {
            this.low = 0 | e3, this.high = 0 | t3, this.unsigned = !!r3;
          }
          function o2(e3) {
            return true === (e3 && e3.__isLong__);
          }
          r2.prototype.__isLong__, Object.defineProperty(r2.prototype, "__isLong__", { value: true }), r2.isLong = o2;
          var n = {}, i = {};
          function a(e3, t3) {
            var r3, o3, a2;
            return t3 ? (a2 = 0 <= (e3 >>>= 0) && e3 < 256) && (o3 = i[e3]) ? o3 : (r3 = c(e3, (0 | e3) < 0 ? -1 : 0, true), a2 && (i[e3] = r3), r3) : (a2 = -128 <= (e3 |= 0) && e3 < 128) && (o3 = n[e3]) ? o3 : (r3 = c(e3, e3 < 0 ? -1 : 0, false), a2 && (n[e3] = r3), r3);
          }
          function s(e3, t3) {
            if (isNaN(e3))
              return t3 ? E : g;
            if (t3) {
              if (e3 < 0)
                return E;
              if (e3 >= h)
                return O;
            } else {
              if (e3 <= -f)
                return R;
              if (e3 + 1 >= f)
                return v;
            }
            return e3 < 0 ? s(-e3, t3).neg() : c(e3 % d | 0, e3 / d | 0, t3);
          }
          function c(e3, t3, o3) {
            return new r2(e3, t3, o3);
          }
          r2.fromInt = a, r2.fromNumber = s, r2.fromBits = c;
          var u = Math.pow;
          function l(e3, t3, r3) {
            if (0 === e3.length)
              throw Error("empty string");
            if ("NaN" === e3 || "Infinity" === e3 || "+Infinity" === e3 || "-Infinity" === e3)
              return g;
            if ("number" == typeof t3 ? (r3 = t3, t3 = false) : t3 = !!t3, (r3 = r3 || 10) < 2 || 36 < r3)
              throw RangeError("radix");
            var o3;
            if ((o3 = e3.indexOf("-")) > 0)
              throw Error("interior hyphen");
            if (0 === o3)
              return l(e3.substring(1), t3, r3).neg();
            for (var n2 = s(u(r3, 8)), i2 = g, a2 = 0; a2 < e3.length; a2 += 8) {
              var c2 = Math.min(8, e3.length - a2), p2 = parseInt(e3.substring(a2, a2 + c2), r3);
              if (c2 < 8) {
                var d2 = s(u(r3, c2));
                i2 = i2.mul(d2).add(s(p2));
              } else
                i2 = (i2 = i2.mul(n2)).add(s(p2));
            }
            return i2.unsigned = t3, i2;
          }
          function p(e3, t3) {
            return "number" == typeof e3 ? s(e3, t3) : "string" == typeof e3 ? l(e3, t3) : c(e3.low, e3.high, "boolean" == typeof t3 ? t3 : e3.unsigned);
          }
          r2.fromString = l, r2.fromValue = p;
          var d = 4294967296, h = d * d, f = h / 2, m = a(1 << 24), g = a(0);
          r2.ZERO = g;
          var E = a(0, true);
          r2.UZERO = E;
          var y = a(1);
          r2.ONE = y;
          var T = a(1, true);
          r2.UONE = T;
          var _ = a(-1);
          r2.NEG_ONE = _;
          var v = c(-1, 2147483647, false);
          r2.MAX_VALUE = v;
          var O = c(-1, -1, true);
          r2.MAX_UNSIGNED_VALUE = O;
          var R = c(0, -2147483648, false);
          r2.MIN_VALUE = R;
          var I = r2.prototype;
          I.toInt = function() {
            return this.unsigned ? this.low >>> 0 : this.low;
          }, I.toNumber = function() {
            return this.unsigned ? (this.high >>> 0) * d + (this.low >>> 0) : this.high * d + (this.low >>> 0);
          }, I.toString = function(e3) {
            if ((e3 = e3 || 10) < 2 || 36 < e3)
              throw RangeError("radix");
            if (this.isZero())
              return "0";
            if (this.isNegative()) {
              if (this.eq(R)) {
                var t3 = s(e3), r3 = this.div(t3), o3 = r3.mul(t3).sub(this);
                return r3.toString(e3) + o3.toInt().toString(e3);
              }
              return "-" + this.neg().toString(e3);
            }
            for (var n2 = s(u(e3, 6), this.unsigned), i2 = this, a2 = ""; ; ) {
              var c2 = i2.div(n2), l2 = (i2.sub(c2.mul(n2)).toInt() >>> 0).toString(e3);
              if ((i2 = c2).isZero())
                return l2 + a2;
              for (; l2.length < 6; )
                l2 = "0" + l2;
              a2 = "" + l2 + a2;
            }
          }, I.getHighBits = function() {
            return this.high;
          }, I.getHighBitsUnsigned = function() {
            return this.high >>> 0;
          }, I.getLowBits = function() {
            return this.low;
          }, I.getLowBitsUnsigned = function() {
            return this.low >>> 0;
          }, I.getNumBitsAbs = function() {
            if (this.isNegative())
              return this.eq(R) ? 64 : this.neg().getNumBitsAbs();
            for (var e3 = 0 != this.high ? this.high : this.low, t3 = 31; t3 > 0 && 0 == (e3 & 1 << t3); t3--)
              ;
            return 0 != this.high ? t3 + 33 : t3 + 1;
          }, I.isZero = function() {
            return 0 === this.high && 0 === this.low;
          }, I.eqz = I.isZero, I.isNegative = function() {
            return !this.unsigned && this.high < 0;
          }, I.isPositive = function() {
            return this.unsigned || this.high >= 0;
          }, I.isOdd = function() {
            return 1 == (1 & this.low);
          }, I.isEven = function() {
            return 0 == (1 & this.low);
          }, I.equals = function(e3) {
            return o2(e3) || (e3 = p(e3)), (this.unsigned === e3.unsigned || this.high >>> 31 != 1 || e3.high >>> 31 != 1) && this.high === e3.high && this.low === e3.low;
          }, I.eq = I.equals, I.notEquals = function(e3) {
            return !this.eq(e3);
          }, I.neq = I.notEquals, I.ne = I.notEquals, I.lessThan = function(e3) {
            return this.comp(e3) < 0;
          }, I.lt = I.lessThan, I.lessThanOrEqual = function(e3) {
            return this.comp(e3) <= 0;
          }, I.lte = I.lessThanOrEqual, I.le = I.lessThanOrEqual, I.greaterThan = function(e3) {
            return this.comp(e3) > 0;
          }, I.gt = I.greaterThan, I.greaterThanOrEqual = function(e3) {
            return this.comp(e3) >= 0;
          }, I.gte = I.greaterThanOrEqual, I.ge = I.greaterThanOrEqual, I.compare = function(e3) {
            if (o2(e3) || (e3 = p(e3)), this.eq(e3))
              return 0;
            var t3 = this.isNegative(), r3 = e3.isNegative();
            return t3 && !r3 ? -1 : !t3 && r3 ? 1 : this.unsigned ? e3.high >>> 0 > this.high >>> 0 || e3.high === this.high && e3.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e3).isNegative() ? -1 : 1;
          }, I.comp = I.compare, I.negate = function() {
            return !this.unsigned && this.eq(R) ? R : this.not().add(y);
          }, I.neg = I.negate, I.add = function(e3) {
            o2(e3) || (e3 = p(e3));
            var t3 = this.high >>> 16, r3 = 65535 & this.high, n2 = this.low >>> 16, i2 = 65535 & this.low, a2 = e3.high >>> 16, s2 = 65535 & e3.high, u2 = e3.low >>> 16, l2 = 0, d2 = 0, h2 = 0, f2 = 0;
            return h2 += (f2 += i2 + (65535 & e3.low)) >>> 16, d2 += (h2 += n2 + u2) >>> 16, l2 += (d2 += r3 + s2) >>> 16, l2 += t3 + a2, c((h2 &= 65535) << 16 | (f2 &= 65535), (l2 &= 65535) << 16 | (d2 &= 65535), this.unsigned);
          }, I.subtract = function(e3) {
            return o2(e3) || (e3 = p(e3)), this.add(e3.neg());
          }, I.sub = I.subtract, I.multiply = function(e3) {
            if (this.isZero())
              return g;
            if (o2(e3) || (e3 = p(e3)), t2)
              return c(t2.mul(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned);
            if (e3.isZero())
              return g;
            if (this.eq(R))
              return e3.isOdd() ? R : g;
            if (e3.eq(R))
              return this.isOdd() ? R : g;
            if (this.isNegative())
              return e3.isNegative() ? this.neg().mul(e3.neg()) : this.neg().mul(e3).neg();
            if (e3.isNegative())
              return this.mul(e3.neg()).neg();
            if (this.lt(m) && e3.lt(m))
              return s(this.toNumber() * e3.toNumber(), this.unsigned);
            var r3 = this.high >>> 16, n2 = 65535 & this.high, i2 = this.low >>> 16, a2 = 65535 & this.low, u2 = e3.high >>> 16, l2 = 65535 & e3.high, d2 = e3.low >>> 16, h2 = 65535 & e3.low, f2 = 0, E2 = 0, y2 = 0, T2 = 0;
            return y2 += (T2 += a2 * h2) >>> 16, E2 += (y2 += i2 * h2) >>> 16, y2 &= 65535, E2 += (y2 += a2 * d2) >>> 16, f2 += (E2 += n2 * h2) >>> 16, E2 &= 65535, f2 += (E2 += i2 * d2) >>> 16, E2 &= 65535, f2 += (E2 += a2 * l2) >>> 16, f2 += r3 * h2 + n2 * d2 + i2 * l2 + a2 * u2, c((y2 &= 65535) << 16 | (T2 &= 65535), (f2 &= 65535) << 16 | (E2 &= 65535), this.unsigned);
          }, I.mul = I.multiply, I.divide = function(e3) {
            if (o2(e3) || (e3 = p(e3)), e3.isZero())
              throw Error("division by zero");
            var r3, n2, i2;
            if (t2)
              return this.unsigned || -2147483648 !== this.high || -1 !== e3.low || -1 !== e3.high ? c((this.unsigned ? t2.div_u : t2.div_s)(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned) : this;
            if (this.isZero())
              return this.unsigned ? E : g;
            if (this.unsigned) {
              if (e3.unsigned || (e3 = e3.toUnsigned()), e3.gt(this))
                return E;
              if (e3.gt(this.shru(1)))
                return T;
              i2 = E;
            } else {
              if (this.eq(R))
                return e3.eq(y) || e3.eq(_) ? R : e3.eq(R) ? y : (r3 = this.shr(1).div(e3).shl(1)).eq(g) ? e3.isNegative() ? y : _ : (n2 = this.sub(e3.mul(r3)), i2 = r3.add(n2.div(e3)));
              if (e3.eq(R))
                return this.unsigned ? E : g;
              if (this.isNegative())
                return e3.isNegative() ? this.neg().div(e3.neg()) : this.neg().div(e3).neg();
              if (e3.isNegative())
                return this.div(e3.neg()).neg();
              i2 = g;
            }
            for (n2 = this; n2.gte(e3); ) {
              r3 = Math.max(1, Math.floor(n2.toNumber() / e3.toNumber()));
              for (var a2 = Math.ceil(Math.log(r3) / Math.LN2), l2 = a2 <= 48 ? 1 : u(2, a2 - 48), d2 = s(r3), h2 = d2.mul(e3); h2.isNegative() || h2.gt(n2); )
                h2 = (d2 = s(r3 -= l2, this.unsigned)).mul(e3);
              d2.isZero() && (d2 = y), i2 = i2.add(d2), n2 = n2.sub(h2);
            }
            return i2;
          }, I.div = I.divide, I.modulo = function(e3) {
            return o2(e3) || (e3 = p(e3)), t2 ? c((this.unsigned ? t2.rem_u : t2.rem_s)(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned) : this.sub(this.div(e3).mul(e3));
          }, I.mod = I.modulo, I.rem = I.modulo, I.not = function() {
            return c(~this.low, ~this.high, this.unsigned);
          }, I.and = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low & e3.low, this.high & e3.high, this.unsigned);
          }, I.or = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low | e3.low, this.high | e3.high, this.unsigned);
          }, I.xor = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low ^ e3.low, this.high ^ e3.high, this.unsigned);
          }, I.shiftLeft = function(e3) {
            return o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63) ? this : e3 < 32 ? c(this.low << e3, this.high << e3 | this.low >>> 32 - e3, this.unsigned) : c(0, this.low << e3 - 32, this.unsigned);
          }, I.shl = I.shiftLeft, I.shiftRight = function(e3) {
            return o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63) ? this : e3 < 32 ? c(this.low >>> e3 | this.high << 32 - e3, this.high >> e3, this.unsigned) : c(this.high >> e3 - 32, this.high >= 0 ? 0 : -1, this.unsigned);
          }, I.shr = I.shiftRight, I.shiftRightUnsigned = function(e3) {
            if (o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63))
              return this;
            var t3 = this.high;
            return e3 < 32 ? c(this.low >>> e3 | t3 << 32 - e3, t3 >>> e3, this.unsigned) : c(32 === e3 ? t3 : t3 >>> e3 - 32, 0, this.unsigned);
          }, I.shru = I.shiftRightUnsigned, I.shr_u = I.shiftRightUnsigned, I.toSigned = function() {
            return this.unsigned ? c(this.low, this.high, false) : this;
          }, I.toUnsigned = function() {
            return this.unsigned ? this : c(this.low, this.high, true);
          }, I.toBytes = function(e3) {
            return e3 ? this.toBytesLE() : this.toBytesBE();
          }, I.toBytesLE = function() {
            var e3 = this.high, t3 = this.low;
            return [255 & t3, t3 >>> 8 & 255, t3 >>> 16 & 255, t3 >>> 24, 255 & e3, e3 >>> 8 & 255, e3 >>> 16 & 255, e3 >>> 24];
          }, I.toBytesBE = function() {
            var e3 = this.high, t3 = this.low;
            return [e3 >>> 24, e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3, t3 >>> 24, t3 >>> 16 & 255, t3 >>> 8 & 255, 255 & t3];
          }, r2.fromBytes = function(e3, t3, o3) {
            return o3 ? r2.fromBytesLE(e3, t3) : r2.fromBytesBE(e3, t3);
          }, r2.fromBytesLE = function(e3, t3) {
            return new r2(e3[0] | e3[1] << 8 | e3[2] << 16 | e3[3] << 24, e3[4] | e3[5] << 8 | e3[6] << 16 | e3[7] << 24, t3);
          }, r2.fromBytesBE = function(e3, t3) {
            return new r2(e3[4] << 24 | e3[5] << 16 | e3[6] << 8 | e3[7], e3[0] << 24 | e3[1] << 16 | e3[2] << 8 | e3[3], t3);
          };
        }, 969: function(e2) {
          "use strict";
          function t2() {
            this._listeners = {};
          }
          e2.exports = t2, t2.prototype.on = function(e3, t3, r2) {
            return (this._listeners[e3] || (this._listeners[e3] = [])).push({ fn: t3, ctx: r2 || this }), this;
          }, t2.prototype.off = function(e3, t3) {
            if (void 0 === e3)
              this._listeners = {};
            else if (void 0 === t3)
              this._listeners[e3] = [];
            else
              for (var r2 = this._listeners[e3], o2 = 0; o2 < r2.length; )
                r2[o2].fn === t3 ? r2.splice(o2, 1) : ++o2;
            return this;
          }, t2.prototype.emit = function(e3) {
            var t3 = this._listeners[e3];
            if (t3) {
              for (var r2 = [], o2 = 1; o2 < arguments.length; )
                r2.push(arguments[o2++]);
              for (o2 = 0; o2 < t3.length; )
                t3[o2].fn.apply(t3[o2++].ctx, r2);
            }
            return this;
          };
        }, 728: function(e2) {
          "use strict";
          e2.exports = function(e3, t2) {
            for (var r2 = new Array(arguments.length - 1), o2 = 0, n = 2, i = true; n < arguments.length; )
              r2[o2++] = arguments[n++];
            return new Promise(function(n2, a) {
              r2[o2] = function(e4) {
                if (i)
                  if (i = false, e4)
                    a(e4);
                  else {
                    for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; )
                      t3[r3++] = arguments[r3];
                    n2.apply(null, t3);
                  }
              };
              try {
                e3.apply(t2 || null, r2);
              } catch (e4) {
                i && (i = false, a(e4));
              }
            });
          };
        }, 440: function(e2) {
          "use strict";
          var t2 = e2.exports;
          t2.length = function(e3) {
            var t3 = e3.length;
            if (!t3)
              return 0;
            for (var r3 = 0; --t3 % 4 > 1 && "=" === e3.charAt(t3); )
              ++r3;
            return Math.ceil(3 * e3.length) / 4 - r3;
          };
          for (var r2 = new Array(64), o2 = new Array(123), n = 0; n < 64; )
            o2[r2[n] = n < 26 ? n + 65 : n < 52 ? n + 71 : n < 62 ? n - 4 : n - 59 | 43] = n++;
          t2.encode = function(e3, t3, o3) {
            for (var n2, i2 = null, a = [], s = 0, c = 0; t3 < o3; ) {
              var u = e3[t3++];
              switch (c) {
                case 0:
                  a[s++] = r2[u >> 2], n2 = (3 & u) << 4, c = 1;
                  break;
                case 1:
                  a[s++] = r2[n2 | u >> 4], n2 = (15 & u) << 2, c = 2;
                  break;
                case 2:
                  a[s++] = r2[n2 | u >> 6], a[s++] = r2[63 & u], c = 0;
              }
              s > 8191 && ((i2 || (i2 = [])).push(String.fromCharCode.apply(String, a)), s = 0);
            }
            return c && (a[s++] = r2[n2], a[s++] = 61, 1 === c && (a[s++] = 61)), i2 ? (s && i2.push(String.fromCharCode.apply(String, a.slice(0, s))), i2.join("")) : String.fromCharCode.apply(String, a.slice(0, s));
          };
          var i = "invalid encoding";
          t2.decode = function(e3, t3, r3) {
            for (var n2, a = r3, s = 0, c = 0; c < e3.length; ) {
              var u = e3.charCodeAt(c++);
              if (61 === u && s > 1)
                break;
              if (void 0 === (u = o2[u]))
                throw Error(i);
              switch (s) {
                case 0:
                  n2 = u, s = 1;
                  break;
                case 1:
                  t3[r3++] = n2 << 2 | (48 & u) >> 4, n2 = u, s = 2;
                  break;
                case 2:
                  t3[r3++] = (15 & n2) << 4 | (60 & u) >> 2, n2 = u, s = 3;
                  break;
                case 3:
                  t3[r3++] = (3 & n2) << 6 | u, s = 0;
              }
            }
            if (1 === s)
              throw Error(i);
            return r3 - a;
          }, t2.test = function(e3) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e3);
          };
        }, 72: function(e2) {
          e2.exports = o2;
          var t2, r2 = /\/|\./;
          function o2(e3, t3) {
            r2.test(e3) || (e3 = "google/protobuf/" + e3 + ".proto", t3 = { nested: { google: { nested: { protobuf: { nested: t3 } } } } }), o2[e3] = t3;
          }
          o2("any", { Any: { fields: { type_url: { type: "string", id: 1 }, value: { type: "bytes", id: 2 } } } }), o2("duration", { Duration: t2 = { fields: { seconds: { type: "int64", id: 1 }, nanos: { type: "int32", id: 2 } } } }), o2("timestamp", { Timestamp: t2 }), o2("empty", { Empty: { fields: {} } }), o2("struct", { Struct: { fields: { fields: { keyType: "string", type: "Value", id: 1 } } }, Value: { oneofs: { kind: { oneof: ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"] } }, fields: { nullValue: { type: "NullValue", id: 1 }, numberValue: { type: "double", id: 2 }, stringValue: { type: "string", id: 3 }, boolValue: { type: "bool", id: 4 }, structValue: { type: "Struct", id: 5 }, listValue: { type: "ListValue", id: 6 } } }, NullValue: { values: { NULL_VALUE: 0 } }, ListValue: { fields: { values: { rule: "repeated", type: "Value", id: 1 } } } }), o2("wrappers", { DoubleValue: { fields: { value: { type: "double", id: 1 } } }, FloatValue: { fields: { value: { type: "float", id: 1 } } }, Int64Value: { fields: { value: { type: "int64", id: 1 } } }, UInt64Value: { fields: { value: { type: "uint64", id: 1 } } }, Int32Value: { fields: { value: { type: "int32", id: 1 } } }, UInt32Value: { fields: { value: { type: "uint32", id: 1 } } }, BoolValue: { fields: { value: { type: "bool", id: 1 } } }, StringValue: { fields: { value: { type: "string", id: 1 } } }, BytesValue: { fields: { value: { type: "bytes", id: 1 } } } }), o2("field_mask", { FieldMask: { fields: { paths: { rule: "repeated", type: "string", id: 1 } } } }), o2.get = function(e3) {
            return o2[e3] || null;
          };
        }, 525: function(e2, t2, r2) {
          var o2, n, i = e2.exports;
          function a(e3, t3, r3, i2) {
            var a2 = i2.m, s2 = i2.d, c = i2.types, u = i2.ksi, l = void 0 !== u;
            if (e3.resolvedType)
              if (e3.resolvedType instanceof o2) {
                for (var p = l ? s2[r3][u] : s2[r3], d = e3.resolvedType.values, h = Object.keys(d), f = 0; f < h.length; f++)
                  if (!(e3.repeated && d[h[f]] === e3.typeDefault || h[f] != p && d[h[f]] != p)) {
                    l ? a2[r3][u] = d[h[f]] : a2[r3] = d[h[f]];
                    break;
                  }
              } else {
                if ("object" != typeof (l ? s2[r3][u] : s2[r3]))
                  throw TypeError(e3.fullName + ": object expected");
                l ? a2[r3][u] = c[t3].fromObject(s2[r3][u]) : a2[r3] = c[t3].fromObject(s2[r3]);
              }
            else {
              var m = false;
              switch (e3.type) {
                case "double":
                case "float":
                  l ? a2[r3][u] = Number(s2[r3][u]) : a2[r3] = Number(s2[r3]);
                  break;
                case "uint32":
                case "fixed32":
                  l ? a2[r3][u] = s2[r3][u] >>> 0 : a2[r3] = s2[r3] >>> 0;
                  break;
                case "int32":
                case "sint32":
                case "sfixed32":
                  l ? a2[r3][u] = 0 | s2[r3][u] : a2[r3] = 0 | s2[r3];
                  break;
                case "uint64":
                  m = true;
                case "int64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                  n.Long ? l ? a2[r3][u] = n.Long.fromValue(s2[r3][u]).unsigned = m : a2[r3] = n.Long.fromValue(s2[r3]).unsigned = m : "string" == typeof (l ? s2[r3][u] : s2[r3]) ? l ? a2[r3][u] = parseInt(s2[r3][u], 10) : a2[r3] = parseInt(s2[r3], 10) : "number" == typeof (l ? s2[r3][u] : s2[r3]) ? l ? a2[r3][u] = s2[r3][u] : a2[r3] = s2[r3] : "object" == typeof (l ? s2[r3][u] : s2[r3]) && (l ? a2[r3][u] = new n.LongBits(s2[r3][u].low >>> 0, s2[r3][u].high >>> 0).toNumber(m) : a2[r3] = new n.LongBits(s2[r3].low >>> 0, s2[r3].high >>> 0).toNumber(m));
                  break;
                case "bytes":
                  "string" == typeof (l ? s2[r3][u] : s2[r3]) ? l ? n.base64.decode(s2[r3][u], a2[r3][u] = n.newBuffer(n.base64.length(s2[r3][u])), 0) : n.base64.decode(s2[r3], a2[r3] = n.newBuffer(n.base64.length(s2[r3])), 0) : (l ? s2[r3][u] : s2[r3]).length && (l ? a2[r3][u] = s2[r3][u] : a2[r3] = s2[r3]);
                  break;
                case "string":
                  l ? a2[r3][u] = String(s2[r3][u]) : a2[r3] = String(s2[r3]);
                  break;
                case "bool":
                  l ? a2[r3][u] = Boolean(s2[r3][u]) : a2[r3] = Boolean(s2[r3]);
              }
            }
          }
          function s(e3, t3, r3, i2) {
            var a2 = i2.m, s2 = i2.d, c = i2.types, u = i2.ksi, l = i2.o, p = void 0 !== u;
            if (e3.resolvedType)
              e3.resolvedType instanceof o2 ? p ? s2[r3][u] = l.enums === String ? c[t3].values[a2[r3][u]] : a2[r3][u] : s2[r3] = l.enums === String ? c[t3].values[a2[r3]] : a2[r3] : p ? s2[r3][u] = c[t3].toObject(a2[r3][u], l) : s2[r3] = c[t3].toObject(a2[r3], l);
            else {
              var d = false;
              switch (e3.type) {
                case "double":
                case "float":
                  p ? s2[r3][u] = l.json && !isFinite(a2[r3][u]) ? String(a2[r3][u]) : a2[r3][u] : s2[r3] = l.json && !isFinite(a2[r3]) ? String(a2[r3]) : a2[r3];
                  break;
                case "uint64":
                  d = true;
                case "int64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                  "number" == typeof a2[r3][u] ? p ? s2[r3][u] = l.longs === String ? String(a2[r3][u]) : a2[r3][u] : s2[r3] = l.longs === String ? String(a2[r3]) : a2[r3] : p ? s2[r3][u] = l.longs === String ? n.Long.prototype.toString.call(a2[r3][u]) : l.longs === Number ? new n.LongBits(a2[r3][u].low >>> 0, a2[r3][u].high >>> 0).toNumber(d) : a2[r3][u] : s2[r3] = l.longs === String ? n.Long.prototype.toString.call(a2[r3]) : l.longs === Number ? new n.LongBits(a2[r3].low >>> 0, a2[r3].high >>> 0).toNumber(d) : a2[r3];
                  break;
                case "bytes":
                  p ? s2[r3][u] = l.bytes === String ? n.base64.encode(a2[r3][u], 0, a2[r3][u].length) : l.bytes === Array ? Array.prototype.slice.call(a2[r3][u]) : a2[r3][u] : s2[r3] = l.bytes === String ? n.base64.encode(a2[r3], 0, a2[r3].length) : l.bytes === Array ? Array.prototype.slice.call(a2[r3]) : a2[r3];
                  break;
                default:
                  p ? s2[r3][u] = a2[r3][u] : s2[r3] = a2[r3];
              }
            }
          }
          i._configure = function() {
            o2 = r2(582), n = r2(935);
          }, i.fromObject = function(e3) {
            var t3 = e3.fieldsArray;
            return function(e4) {
              return function(r3) {
                if (r3 instanceof this.ctor)
                  return r3;
                if (!t3.length)
                  return new this.ctor();
                for (var i2 = new this.ctor(), s2 = 0; s2 < t3.length; ++s2) {
                  var c, u = t3[s2].resolve(), l = u.name;
                  if (u.map) {
                    if (r3[l]) {
                      if ("object" != typeof r3[l])
                        throw TypeError(u.fullName + ": object expected");
                      i2[l] = {};
                    }
                    var p = Object.keys(r3[l]);
                    for (c = 0; c < p.length; ++c)
                      a(u, s2, l, n.merge(n.copy(e4), { m: i2, d: r3, ksi: p[c] }));
                  } else if (u.repeated) {
                    if (r3[l]) {
                      if (!Array.isArray(r3[l]))
                        throw TypeError(u.fullName + ": array expected");
                      for (i2[l] = [], c = 0; c < r3[l].length; ++c)
                        a(u, s2, l, n.merge(n.copy(e4), { m: i2, d: r3, ksi: c }));
                    }
                  } else
                    (u.resolvedType instanceof o2 || null != r3[l]) && a(u, s2, l, n.merge(n.copy(e4), { m: i2, d: r3 }));
                }
                return i2;
              };
            };
          }, i.toObject = function(e3) {
            var t3 = e3.fieldsArray.slice().sort(n.compareFieldsById);
            return function(r3) {
              return t3.length ? function(i2, a2) {
                a2 = a2 || {};
                for (var c, u, l = {}, p = [], d = [], h = [], f = 0; f < t3.length; ++f)
                  t3[f].partOf || (t3[f].resolve().repeated ? p : t3[f].map ? d : h).push(t3[f]);
                if (p.length && (a2.arrays || a2.defaults))
                  for (f = 0; f < p.length; ++f)
                    l[p[f].name] = [];
                if (d.length && (a2.objects || a2.defaults))
                  for (f = 0; f < d.length; ++f)
                    l[d[f].name] = {};
                if (h.length && a2.defaults)
                  for (f = 0; f < h.length; ++f)
                    if (u = (c = h[f]).name, c.resolvedType instanceof o2)
                      l[u] = a2.enums = String ? c.resolvedType.valuesById[c.typeDefault] : c.typeDefault;
                    else if (c.long)
                      if (n.Long) {
                        var m = new n.Long(c.typeDefault.low, c.typeDefault.high, c.typeDefault.unsigned);
                        l[u] = a2.longs === String ? m.toString() : a2.longs === Number ? m.toNumber() : m;
                      } else
                        l[u] = a2.longs === String ? c.typeDefault.toString() : c.typeDefault.toNumber();
                    else
                      c.bytes ? l[u] = a2.bytes === String ? String.fromCharCode.apply(String, c.typeDefault) : Array.prototype.slice.call(c.typeDefault).join("*..*").split("*..*") : l[u] = c.typeDefault;
                var g = false;
                for (f = 0; f < t3.length; ++f) {
                  u = (c = t3[f]).name;
                  var E, y, T = e3._fieldsArray.indexOf(c);
                  if (c.map) {
                    if (g || (g = true), i2[u] && (E = Object.keys(i2[u]).length))
                      for (l[u] = {}, y = 0; y < E.length; ++y)
                        s(c, T, u, n.merge(n.copy(r3), { m: i2, d: l, ksi: E[y], o: a2 }));
                  } else if (c.repeated) {
                    if (i2[u] && i2[u].length)
                      for (l[u] = [], y = 0; y < i2[u].length; ++y)
                        s(c, T, u, n.merge(n.copy(r3), { m: i2, d: l, ksi: y, o: a2 }));
                  } else
                    null != i2[u] && i2.hasOwnProperty(u) && s(c, T, u, n.merge(n.copy(r3), { m: i2, d: l, o: a2 })), c.partOf && a2.oneofs && (l[c.partOf.name] = u);
                }
                return l;
              } : function() {
                return {};
              };
            };
          };
        }, 888: function(e2, t2, r2) {
          var o2, n, i;
          function a(e3) {
            return "missing required '" + e3.name + "'";
          }
          function s(e3) {
            return function(t3) {
              var r3 = t3.Reader, s2 = t3.types, c = t3.util;
              return function(t4, u) {
                t4 instanceof r3 || (t4 = r3.create(t4));
                for (var l, p = void 0 === u ? t4.len : t4.pos + u, d = new this.ctor(); t4.pos < p; ) {
                  var h = t4.uint32();
                  if (e3.group && 4 == (7 & h))
                    break;
                  for (var f = h >>> 3, m = 0, g = false; m < e3.fieldsArray.length; ++m) {
                    var E = e3._fieldsArray[m].resolve(), y = E.name, T = E.resolvedType instanceof o2 ? "int32" : E.type;
                    if (f == E.id) {
                      if (g = true, E.map)
                        t4.skip().pos++, d[y] === c.emptyObject && (d[y] = {}), l = t4[E.keyType](), t4.pos++, null != n.long[E.keyType] ? null == n.basic[T] ? d[y]["object" == typeof l ? c.longToHash(l) : l] = s2[m].decode(t4, t4.uint32()) : d[y]["object" == typeof l ? c.longToHash(l) : l] = t4[T]() : null == n.basic[T] ? d[y] = s2[m].decode(t4, t4.uint32()) : d[y] = t4[T]();
                      else if (E.repeated)
                        if (d[y] && d[y].length || (d[y] = []), null != n.packed[T] && 2 == (7 & h))
                          for (var _ = t4.uint32() + t4.pos; t4.pos < _; )
                            d[y].push(t4[T]());
                        else
                          null == n.basic[T] ? E.resolvedType.group ? d[y].push(s2[m].decode(t4)) : d[y].push(s2[m].decode(t4, t4.uint32())) : d[y].push(t4[T]());
                      else
                        null == n.basic[T] ? E.resolvedType.group ? d[y] = s2[m].decode(t4) : d[y] = s2[m].decode(t4, t4.uint32()) : d[y] = t4[T]();
                      break;
                    }
                  }
                  g || (console.log("t", h), t4.skipType(7 & h));
                }
                for (m = 0; m < e3._fieldsArray.length; ++m) {
                  var v = e3._fieldsArray[m];
                  if (v.required && !d.hasOwnProperty(v.name))
                    throw i.ProtocolError(a(v), { instance: d });
                }
                return d;
              };
            };
          }
          e2.exports = s, s._configure = function() {
            o2 = r2(582), n = r2(696), i = r2(935);
          };
        }, 929: function(e2, t2, r2) {
          var o2, n;
          function i(e3) {
            return function(t3) {
              var r3 = t3.Writer, i2 = t3.types, a = t3.util;
              return function(t4, s) {
                s = s || r3.create();
                for (var c = e3.fieldsArray.slice().sort(a.compareFieldsById), u = 0; u < c.length; u++) {
                  var l = c[u], p = e3._fieldsArray.indexOf(l), d = l.resolvedType instanceof o2 ? "uint32" : l.type, h = n.basic[d], f = t4[l.name];
                  if (l.resolvedType instanceof o2 && "string" == typeof f && (f = i2[p].values[f]), l.map) {
                    if (null != f && t4.hasOwnProperty(l.name))
                      for (var m = Object.keys(f), g = 0; g < m.length; ++g)
                        s.uint32((l.id << 3 | 2) >>> 0).fork().uint32(8 | n.mapKey[l.keyType])[l.keyType](m[g]), void 0 === h ? i2[p].encode(f[m[g]], s.uint32(18).fork()).ldelim().ldelim() : s.uint32(16 | h)[d](f[m[g]]).ldelim();
                  } else if (l.repeated) {
                    if (f && f.length)
                      if (l.packed && void 0 !== n.packed[d]) {
                        s.uint32((l.id << 3 | 2) >>> 0).fork();
                        for (var E = 0; E < f.length; E++)
                          s[d](f[E]);
                        s.ldelim();
                      } else
                        for (var y = 0; y < f.length; y++)
                          void 0 === h ? l.resolvedType.group ? i2[p].encode(f[y], s.uint32((l.id << 3 | 3) >>> 0)).uint32((l.id << 3 | 4) >>> 0) : i2[p].encode(f[y], s.uint32((l.id << 3 | 2) >>> 0).fork()).ldelim() : s.uint32((l.id << 3 | h) >>> 0)[d](f[y]);
                  } else
                    (!l.optional || null != f && t4.hasOwnProperty(l.name)) && (l.optional || null != f && t4.hasOwnProperty(l.name) || console.warn("注意啦!!!很大概率会报错 类型:", t4.$type ? t4.$type.name : "不晓得", "没有设置对应的属性:", l.name, "检查是不是proto文件属性设置为了required"), void 0 === h ? l.resolvedType.group ? i2[p].encode(f, s.uint32((l.id << 3 | 3) >>> 0)).uint32((l.id << 3 | 4) >>> 0) : i2[p].encode(f, s.uint32((l.id << 3 | 2) >>> 0).fork()).ldelim() : s.uint32((l.id << 3 | h) >>> 0)[d](f));
                }
                return s;
              };
            };
          }
          e2.exports = i, i._configure = function() {
            o2 = r2(582), n = r2(696);
          };
        }, 582: function(e2, t2, r2) {
          e2.exports = i;
          var o2 = r2(998);
          ((i.prototype = Object.create(o2.prototype)).constructor = i).className = "Enum";
          var n = r2(476);
          function i(e3, t3, r3, n2, i2) {
            if (o2.call(this, e3, r3), t3 && "object" != typeof t3)
              throw TypeError("values must be an object");
            if (this.valuesById = {}, this.values = Object.create(this.valuesById), this.comment = n2, this.comments = i2 || {}, this.reserved = void 0, t3)
              for (var a = Object.keys(t3), s = 0; s < a.length; ++s)
                "number" == typeof t3[a[s]] && (this.valuesById[this.values[a[s]] = t3[a[s]]] = a[s]);
          }
          i.fromJSON = function(e3, t3) {
            var r3 = new i(e3, t3.values, t3.options, t3.comment, t3.comments);
            return r3.reserved = t3.reserved, r3;
          }, i.prototype.toJSON = function(e3) {
            var t3 = !!e3 && Boolean(e3.keepComments);
            return util.toObject(["options", this.options, "values", this.values, "reserved", this.reserved && this.reserved.length ? this.reserved : void 0, "comment", t3 ? this.comment : void 0, "comments", t3 ? this.comments : void 0]);
          }, i.prototype.add = function(e3, t3, r3) {
            if (!util.isString(e3))
              throw TypeError("name must be a string");
            if (!util.isInteger(t3))
              throw TypeError("id must be an integer");
            if (void 0 !== this.values[e3])
              throw Error("duplicate name '" + e3 + "' in " + this);
            if (this.isReservedId(t3))
              throw Error("id " + t3 + " is reserved in " + this);
            if (this.isReservedName(e3))
              throw Error("name '" + e3 + "' is reserved in " + this);
            if (void 0 !== this.valuesById[t3]) {
              if (!this.options || !this.options.allow_alias)
                throw Error("duplicate id " + t3 + " in " + this);
              this.values[e3] = t3;
            } else
              this.valuesById[this.values[e3] = t3] = e3;
            return this.comments[e3] = r3 || null, this;
          }, i.prototype.remove = function(e3) {
            if (!util.isString(e3))
              throw TypeError("name must be a string");
            var t3 = this.values[e3];
            if (null == t3)
              throw Error("name '" + e3 + "' does not exist in " + this);
            return delete this.valuesById[t3], delete this.values[e3], delete this.comments[e3], this;
          }, i.prototype.isReservedId = function(e3) {
            return n.isReservedId(this.reserved, e3);
          }, i.prototype.isReservedName = function(e3) {
            return n.isReservedName(this.reserved, e3);
          };
        }, 286: function(e2, t2, r2) {
          e2.exports = u;
          var o2, n, i, a, s = r2(998);
          ((u.prototype = Object.create(s.prototype)).constructor = u).className = "Field";
          var c = /^required|optional|repeated$/;
          function u(e3, t3, r3, o3, a2, u2, l) {
            if (i.isObject(o3) ? (l = a2, u2 = o3, o3 = a2 = void 0) : i.isObject(a2) && (l = u2, u2 = a2, a2 = void 0), s.call(this, e3, u2), !i.isInteger(t3) || t3 < 0)
              throw TypeError("id must be a non-negative integer");
            if (!i.isString(r3))
              throw TypeError("type must be a string");
            if (void 0 !== o3 && !c.test(o3 = o3.toString().toLowerCase()))
              throw TypeError("rule must be a string rule");
            if (void 0 !== a2 && !i.isString(a2))
              throw TypeError("extend must be a string");
            this.rule = o3 && "optional" !== o3 ? o3 : void 0, this.type = r3, this.id = t3, this.extend = a2 || void 0, this.required = "required" === o3, this.optional = !this.required, this.repeated = "repeated" === o3, this.map = false, this.message = null, this.partOf = null, this.typeDefault = null, this.defaultValue = null, this.long = !!i.Long && void 0 !== n.long[r3], this.bytes = "bytes" === r3, this.resolvedType = null, this.extensionField = null, this.declaringField = null, this._packed = null, this.comment = l;
          }
          u.fromJSON = function(e3, t3) {
            return new u(e3, t3.id, t3.type, t3.rule, t3.extend, t3.options, t3.comment);
          }, Object.defineProperty(u.prototype, "packed", { get: function() {
            return null === this._packed && (this._packed = false !== this.getOption("packed")), this._packed;
          } }), u.prototype.setOption = function(e3, t3, r3) {
            return "packed" === e3 && (this._packed = null), s.prototype.setOption.call(this, e3, t3, r3);
          }, u.prototype.toJSON = function(e3) {
            var t3 = !!e3 && Boolean(e3.keepComments);
            return i.toObject(["rule", "optional" !== this.rule && this.rule || void 0, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t3 ? this.comment : void 0]);
          }, u.prototype.resolve = function() {
            if (this.resolved)
              return this;
            if (void 0 === (this.typeDefault = n.defaults[this.type]) && (this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type), this.resolvedType instanceof a ? this.typeDefault = null : this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]), this.options && null != this.options.default && (this.typeDefault = this.options.default, this.resolvedType instanceof o2 && "string" == typeof this.typeDefault && (this.typeDefault = this.resolvedType.values[this.typeDefault])), this.options && (true !== this.options.packed && (void 0 === this.options.packed || !this.resolvedType || this.resolvedType instanceof o2) || delete this.options.packed, Object.keys(this.options).length || (this.options = void 0)), this.long)
              this.typeDefault = i.Long.fromNumber(this.typeDefault, "u" === this.type.charAt(0)), Object.freeze && Object.freeze(this.typeDefault);
            else if (this.bytes && "string" == typeof this.typeDefault) {
              var e3;
              i.utf8.write(this.typeDefault, e3 = i.newBuffer(i.utf8.length(this.typeDefault)), 0), this.typeDefault = e3;
            }
            return this.map ? this.defaultValue = i.emptyObject : this.repeated ? this.defaultValue = i.emptyArray : this.defaultValue = this.typeDefault, this.parent instanceof a && (this.parent.ctor.prototype[this.name] = this.defaultValue), s.prototype.resolve.call(this);
          }, u.d = function(e3, t3, r3, o3) {
            return "function" == typeof t3 ? t3 = i.decorateType(t3).name : t3 && "object" == typeof t3 && (t3 = i.decorateEnum(t3).name), function(n2, a2) {
              i.decorateType(n2.constructor).add(new u(a2, e3, t3, r3, { default: o3 }));
            };
          }, u._configure = function() {
            a = r2(192), o2 = r2(582), n = r2(696), i = r2(935);
          };
        }, 283: function(e2) {
          function t2(e3) {
            return "undefined" != typeof Float32Array ? function() {
              var t3 = new Float32Array([-0]), r3 = new Uint8Array(t3.buffer), o3 = 128 === r3[3];
              function n2(e4, o4, n3) {
                t3[0] = e4, o4[n3] = r3[0], o4[n3 + 1] = r3[1], o4[n3 + 2] = r3[2], o4[n3 + 3] = r3[3];
              }
              function i2(e4, o4, n3) {
                t3[0] = e4, o4[n3] = r3[3], o4[n3 + 1] = r3[2], o4[n3 + 2] = r3[1], o4[n3 + 3] = r3[0];
              }
              function a(e4, o4) {
                return r3[0] = e4[o4], r3[1] = e4[o4 + 1], r3[2] = e4[o4 + 2], r3[3] = e4[o4 + 3], t3[0];
              }
              function s(e4, o4) {
                return r3[3] = e4[o4], r3[2] = e4[o4 + 1], r3[1] = e4[o4 + 2], r3[0] = e4[o4 + 3], t3[0];
              }
              e3.writeFloatLE = o3 ? n2 : i2, e3.writeFloatBE = o3 ? i2 : n2, e3.readFloatLE = o3 ? a : s, e3.readFloatBE = o3 ? s : a;
            }() : function() {
              function t3(e4, t4, r3, o3) {
                var n2 = t4 < 0 ? 1 : 0;
                if (n2 && (t4 = -t4), 0 === t4)
                  e4(1 / t4 > 0 ? 0 : 2147483648, r3, o3);
                else if (isNaN(t4))
                  e4(2143289344, r3, o3);
                else if (t4 > 34028234663852886e22)
                  e4((n2 << 31 | 2139095040) >>> 0, r3, o3);
                else if (t4 < 11754943508222875e-54)
                  e4((n2 << 31 | Math.round(t4 / 1401298464324817e-60)) >>> 0, r3, o3);
                else {
                  var i2 = Math.floor(Math.log(t4) / Math.LN2);
                  e4((n2 << 31 | i2 + 127 << 23 | 8388607 & Math.round(t4 * Math.pow(2, -i2) * 8388608)) >>> 0, r3, o3);
                }
              }
              function a(e4, t4, r3) {
                var o3 = e4(t4, r3), n2 = 2 * (o3 >> 31) + 1, i2 = o3 >>> 23 & 255, a2 = 8388607 & o3;
                return 255 === i2 ? a2 ? NaN : n2 * (1 / 0) : 0 === i2 ? 1401298464324817e-60 * n2 * a2 : n2 * Math.pow(2, i2 - 150) * (a2 + 8388608);
              }
              e3.writeFloatLE = t3.bind(null, r2), e3.writeFloatBE = t3.bind(null, o2), e3.readFloatLE = a.bind(null, n), e3.readFloatBE = a.bind(null, i);
            }(), "undefined" != typeof Float64Array ? function() {
              var t3 = new Float64Array([-0]), r3 = new Uint8Array(t3.buffer), o3 = 128 === r3[7];
              function n2(e4, o4, n3) {
                t3[0] = e4, o4[n3] = r3[0], o4[n3 + 1] = r3[1], o4[n3 + 2] = r3[2], o4[n3 + 3] = r3[3], o4[n3 + 4] = r3[4], o4[n3 + 5] = r3[5], o4[n3 + 6] = r3[6], o4[n3 + 7] = r3[7];
              }
              function i2(e4, o4, n3) {
                t3[0] = e4, o4[n3] = r3[7], o4[n3 + 1] = r3[6], o4[n3 + 2] = r3[5], o4[n3 + 3] = r3[4], o4[n3 + 4] = r3[3], o4[n3 + 5] = r3[2], o4[n3 + 6] = r3[1], o4[n3 + 7] = r3[0];
              }
              function a(e4, o4) {
                return r3[0] = e4[o4], r3[1] = e4[o4 + 1], r3[2] = e4[o4 + 2], r3[3] = e4[o4 + 3], r3[4] = e4[o4 + 4], r3[5] = e4[o4 + 5], r3[6] = e4[o4 + 6], r3[7] = e4[o4 + 7], t3[0];
              }
              function s(e4, o4) {
                return r3[7] = e4[o4], r3[6] = e4[o4 + 1], r3[5] = e4[o4 + 2], r3[4] = e4[o4 + 3], r3[3] = e4[o4 + 4], r3[2] = e4[o4 + 5], r3[1] = e4[o4 + 6], r3[0] = e4[o4 + 7], t3[0];
              }
              e3.writeDoubleLE = o3 ? n2 : i2, e3.writeDoubleBE = o3 ? i2 : n2, e3.readDoubleLE = o3 ? a : s, e3.readDoubleBE = o3 ? s : a;
            }() : function() {
              function t3(e4, t4, r3, o3, n2, i2) {
                var a2 = o3 < 0 ? 1 : 0;
                if (a2 && (o3 = -o3), 0 === o3)
                  e4(0, n2, i2 + t4), e4(1 / o3 > 0 ? 0 : 2147483648, n2, i2 + r3);
                else if (isNaN(o3))
                  e4(0, n2, i2 + t4), e4(2146959360, n2, i2 + r3);
                else if (o3 > 17976931348623157e292)
                  e4(0, n2, i2 + t4), e4((a2 << 31 | 2146435072) >>> 0, n2, i2 + r3);
                else {
                  var s;
                  if (o3 < 22250738585072014e-324)
                    e4((s = o3 / 5e-324) >>> 0, n2, i2 + t4), e4((a2 << 31 | s / 4294967296) >>> 0, n2, i2 + r3);
                  else {
                    var c = Math.floor(Math.log(o3) / Math.LN2);
                    1024 === c && (c = 1023), e4(4503599627370496 * (s = o3 * Math.pow(2, -c)) >>> 0, n2, i2 + t4), e4((a2 << 31 | c + 1023 << 20 | 1048576 * s & 1048575) >>> 0, n2, i2 + r3);
                  }
                }
              }
              function a(e4, t4, r3, o3, n2) {
                var i2 = e4(o3, n2 + t4), a2 = e4(o3, n2 + r3), s = 2 * (a2 >> 31) + 1, c = a2 >>> 20 & 2047, u = 4294967296 * (1048575 & a2) + i2;
                return 2047 === c ? u ? NaN : s * (1 / 0) : 0 === c ? 5e-324 * s * u : s * Math.pow(2, c - 1075) * (u + 4503599627370496);
              }
              e3.writeDoubleLE = t3.bind(null, r2, 0, 4), e3.writeDoubleBE = t3.bind(null, o2, 4, 0), e3.readDoubleLE = a.bind(null, n, 0, 4), e3.readDoubleBE = a.bind(null, i, 4, 0);
            }(), e3;
          }
          function r2(e3, t3, r3) {
            t3[r3] = 255 & e3, t3[r3 + 1] = e3 >>> 8 & 255, t3[r3 + 2] = e3 >>> 16 & 255, t3[r3 + 3] = e3 >>> 24;
          }
          function o2(e3, t3, r3) {
            t3[r3] = e3 >>> 24, t3[r3 + 1] = e3 >>> 16 & 255, t3[r3 + 2] = e3 >>> 8 & 255, t3[r3 + 3] = 255 & e3;
          }
          function n(e3, t3) {
            return (e3[t3] | e3[t3 + 1] << 8 | e3[t3 + 2] << 16 | e3[t3 + 3] << 24) >>> 0;
          }
          function i(e3, t3) {
            return (e3[t3] << 24 | e3[t3 + 1] << 16 | e3[t3 + 2] << 8 | e3[t3 + 3]) >>> 0;
          }
          e2.exports = t2(t2);
        }, 939: function(e2) {
          e2.exports = r2;
          var t2 = null;
          try {
            t2 = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports;
          } catch (e3) {
          }
          function r2(e3, t3, r3) {
            this.low = 0 | e3, this.high = 0 | t3, this.unsigned = !!r3;
          }
          function o2(e3) {
            return true === (e3 && e3.__isLong__);
          }
          r2.prototype.__isLong__, Object.defineProperty(r2.prototype, "__isLong__", { value: true }), r2.isLong = o2;
          var n = {}, i = {};
          function a(e3, t3) {
            var r3, o3, a2;
            return t3 ? (a2 = 0 <= (e3 >>>= 0) && e3 < 256) && (o3 = i[e3]) ? o3 : (r3 = c(e3, (0 | e3) < 0 ? -1 : 0, true), a2 && (i[e3] = r3), r3) : (a2 = -128 <= (e3 |= 0) && e3 < 128) && (o3 = n[e3]) ? o3 : (r3 = c(e3, e3 < 0 ? -1 : 0, false), a2 && (n[e3] = r3), r3);
          }
          function s(e3, t3) {
            if (isNaN(e3))
              return t3 ? E : g;
            if (t3) {
              if (e3 < 0)
                return E;
              if (e3 >= h)
                return O;
            } else {
              if (e3 <= -f)
                return R;
              if (e3 + 1 >= f)
                return v;
            }
            return e3 < 0 ? s(-e3, t3).neg() : c(e3 % d | 0, e3 / d | 0, t3);
          }
          function c(e3, t3, o3) {
            return new r2(e3, t3, o3);
          }
          r2.fromInt = a, r2.fromNumber = s, r2.fromBits = c;
          var u = Math.pow;
          function l(e3, t3, r3) {
            if (0 === e3.length)
              throw Error("empty string");
            if ("NaN" === e3 || "Infinity" === e3 || "+Infinity" === e3 || "-Infinity" === e3)
              return g;
            if ("number" == typeof t3 ? (r3 = t3, t3 = false) : t3 = !!t3, (r3 = r3 || 10) < 2 || 36 < r3)
              throw RangeError("radix");
            var o3;
            if ((o3 = e3.indexOf("-")) > 0)
              throw Error("interior hyphen");
            if (0 === o3)
              return l(e3.substring(1), t3, r3).neg();
            for (var n2 = s(u(r3, 8)), i2 = g, a2 = 0; a2 < e3.length; a2 += 8) {
              var c2 = Math.min(8, e3.length - a2), p2 = parseInt(e3.substring(a2, a2 + c2), r3);
              if (c2 < 8) {
                var d2 = s(u(r3, c2));
                i2 = i2.mul(d2).add(s(p2));
              } else
                i2 = (i2 = i2.mul(n2)).add(s(p2));
            }
            return i2.unsigned = t3, i2;
          }
          function p(e3, t3) {
            return "number" == typeof e3 ? s(e3, t3) : "string" == typeof e3 ? l(e3, t3) : c(e3.low, e3.high, "boolean" == typeof t3 ? t3 : e3.unsigned);
          }
          r2.fromString = l, r2.fromValue = p;
          var d = 4294967296, h = d * d, f = h / 2, m = a(1 << 24), g = a(0);
          r2.ZERO = g;
          var E = a(0, true);
          r2.UZERO = E;
          var y = a(1);
          r2.ONE = y;
          var T = a(1, true);
          r2.UONE = T;
          var _ = a(-1);
          r2.NEG_ONE = _;
          var v = c(-1, 2147483647, false);
          r2.MAX_VALUE = v;
          var O = c(-1, -1, true);
          r2.MAX_UNSIGNED_VALUE = O;
          var R = c(0, -2147483648, false);
          r2.MIN_VALUE = R;
          var I = r2.prototype;
          I.toInt = function() {
            return this.unsigned ? this.low >>> 0 : this.low;
          }, I.toNumber = function() {
            return this.unsigned ? (this.high >>> 0) * d + (this.low >>> 0) : this.high * d + (this.low >>> 0);
          }, I.toString = function(e3) {
            if ((e3 = e3 || 10) < 2 || 36 < e3)
              throw RangeError("radix");
            if (this.isZero())
              return "0";
            if (this.isNegative()) {
              if (this.eq(R)) {
                var t3 = s(e3), r3 = this.div(t3), o3 = r3.mul(t3).sub(this);
                return r3.toString(e3) + o3.toInt().toString(e3);
              }
              return "-" + this.neg().toString(e3);
            }
            for (var n2 = s(u(e3, 6), this.unsigned), i2 = this, a2 = ""; ; ) {
              var c2 = i2.div(n2), l2 = (i2.sub(c2.mul(n2)).toInt() >>> 0).toString(e3);
              if ((i2 = c2).isZero())
                return l2 + a2;
              for (; l2.length < 6; )
                l2 = "0" + l2;
              a2 = "" + l2 + a2;
            }
          }, I.getHighBits = function() {
            return this.high;
          }, I.getHighBitsUnsigned = function() {
            return this.high >>> 0;
          }, I.getLowBits = function() {
            return this.low;
          }, I.getLowBitsUnsigned = function() {
            return this.low >>> 0;
          }, I.getNumBitsAbs = function() {
            if (this.isNegative())
              return this.eq(R) ? 64 : this.neg().getNumBitsAbs();
            for (var e3 = 0 != this.high ? this.high : this.low, t3 = 31; t3 > 0 && 0 == (e3 & 1 << t3); t3--)
              ;
            return 0 != this.high ? t3 + 33 : t3 + 1;
          }, I.isZero = function() {
            return 0 === this.high && 0 === this.low;
          }, I.eqz = I.isZero, I.isNegative = function() {
            return !this.unsigned && this.high < 0;
          }, I.isPositive = function() {
            return this.unsigned || this.high >= 0;
          }, I.isOdd = function() {
            return 1 == (1 & this.low);
          }, I.isEven = function() {
            return 0 == (1 & this.low);
          }, I.equals = function(e3) {
            return o2(e3) || (e3 = p(e3)), (this.unsigned === e3.unsigned || this.high >>> 31 != 1 || e3.high >>> 31 != 1) && this.high === e3.high && this.low === e3.low;
          }, I.eq = I.equals, I.notEquals = function(e3) {
            return !this.eq(e3);
          }, I.neq = I.notEquals, I.ne = I.notEquals, I.lessThan = function(e3) {
            return this.comp(e3) < 0;
          }, I.lt = I.lessThan, I.lessThanOrEqual = function(e3) {
            return this.comp(e3) <= 0;
          }, I.lte = I.lessThanOrEqual, I.le = I.lessThanOrEqual, I.greaterThan = function(e3) {
            return this.comp(e3) > 0;
          }, I.gt = I.greaterThan, I.greaterThanOrEqual = function(e3) {
            return this.comp(e3) >= 0;
          }, I.gte = I.greaterThanOrEqual, I.ge = I.greaterThanOrEqual, I.compare = function(e3) {
            if (o2(e3) || (e3 = p(e3)), this.eq(e3))
              return 0;
            var t3 = this.isNegative(), r3 = e3.isNegative();
            return t3 && !r3 ? -1 : !t3 && r3 ? 1 : this.unsigned ? e3.high >>> 0 > this.high >>> 0 || e3.high === this.high && e3.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e3).isNegative() ? -1 : 1;
          }, I.comp = I.compare, I.negate = function() {
            return !this.unsigned && this.eq(R) ? R : this.not().add(y);
          }, I.neg = I.negate, I.add = function(e3) {
            o2(e3) || (e3 = p(e3));
            var t3 = this.high >>> 16, r3 = 65535 & this.high, n2 = this.low >>> 16, i2 = 65535 & this.low, a2 = e3.high >>> 16, s2 = 65535 & e3.high, u2 = e3.low >>> 16, l2 = 0, d2 = 0, h2 = 0, f2 = 0;
            return h2 += (f2 += i2 + (65535 & e3.low)) >>> 16, d2 += (h2 += n2 + u2) >>> 16, l2 += (d2 += r3 + s2) >>> 16, l2 += t3 + a2, c((h2 &= 65535) << 16 | (f2 &= 65535), (l2 &= 65535) << 16 | (d2 &= 65535), this.unsigned);
          }, I.subtract = function(e3) {
            return o2(e3) || (e3 = p(e3)), this.add(e3.neg());
          }, I.sub = I.subtract, I.multiply = function(e3) {
            if (this.isZero())
              return g;
            if (o2(e3) || (e3 = p(e3)), t2)
              return c(t2.mul(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned);
            if (e3.isZero())
              return g;
            if (this.eq(R))
              return e3.isOdd() ? R : g;
            if (e3.eq(R))
              return this.isOdd() ? R : g;
            if (this.isNegative())
              return e3.isNegative() ? this.neg().mul(e3.neg()) : this.neg().mul(e3).neg();
            if (e3.isNegative())
              return this.mul(e3.neg()).neg();
            if (this.lt(m) && e3.lt(m))
              return s(this.toNumber() * e3.toNumber(), this.unsigned);
            var r3 = this.high >>> 16, n2 = 65535 & this.high, i2 = this.low >>> 16, a2 = 65535 & this.low, u2 = e3.high >>> 16, l2 = 65535 & e3.high, d2 = e3.low >>> 16, h2 = 65535 & e3.low, f2 = 0, E2 = 0, y2 = 0, T2 = 0;
            return y2 += (T2 += a2 * h2) >>> 16, E2 += (y2 += i2 * h2) >>> 16, y2 &= 65535, E2 += (y2 += a2 * d2) >>> 16, f2 += (E2 += n2 * h2) >>> 16, E2 &= 65535, f2 += (E2 += i2 * d2) >>> 16, E2 &= 65535, f2 += (E2 += a2 * l2) >>> 16, f2 += r3 * h2 + n2 * d2 + i2 * l2 + a2 * u2, c((y2 &= 65535) << 16 | (T2 &= 65535), (f2 &= 65535) << 16 | (E2 &= 65535), this.unsigned);
          }, I.mul = I.multiply, I.divide = function(e3) {
            if (o2(e3) || (e3 = p(e3)), e3.isZero())
              throw Error("division by zero");
            var r3, n2, i2;
            if (t2)
              return this.unsigned || -2147483648 !== this.high || -1 !== e3.low || -1 !== e3.high ? c((this.unsigned ? t2.div_u : t2.div_s)(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned) : this;
            if (this.isZero())
              return this.unsigned ? E : g;
            if (this.unsigned) {
              if (e3.unsigned || (e3 = e3.toUnsigned()), e3.gt(this))
                return E;
              if (e3.gt(this.shru(1)))
                return T;
              i2 = E;
            } else {
              if (this.eq(R))
                return e3.eq(y) || e3.eq(_) ? R : e3.eq(R) ? y : (r3 = this.shr(1).div(e3).shl(1)).eq(g) ? e3.isNegative() ? y : _ : (n2 = this.sub(e3.mul(r3)), i2 = r3.add(n2.div(e3)));
              if (e3.eq(R))
                return this.unsigned ? E : g;
              if (this.isNegative())
                return e3.isNegative() ? this.neg().div(e3.neg()) : this.neg().div(e3).neg();
              if (e3.isNegative())
                return this.div(e3.neg()).neg();
              i2 = g;
            }
            for (n2 = this; n2.gte(e3); ) {
              r3 = Math.max(1, Math.floor(n2.toNumber() / e3.toNumber()));
              for (var a2 = Math.ceil(Math.log(r3) / Math.LN2), l2 = a2 <= 48 ? 1 : u(2, a2 - 48), d2 = s(r3), h2 = d2.mul(e3); h2.isNegative() || h2.gt(n2); )
                h2 = (d2 = s(r3 -= l2, this.unsigned)).mul(e3);
              d2.isZero() && (d2 = y), i2 = i2.add(d2), n2 = n2.sub(h2);
            }
            return i2;
          }, I.div = I.divide, I.modulo = function(e3) {
            return o2(e3) || (e3 = p(e3)), t2 ? c((this.unsigned ? t2.rem_u : t2.rem_s)(this.low, this.high, e3.low, e3.high), t2.get_high(), this.unsigned) : this.sub(this.div(e3).mul(e3));
          }, I.mod = I.modulo, I.rem = I.modulo, I.not = function() {
            return c(~this.low, ~this.high, this.unsigned);
          }, I.and = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low & e3.low, this.high & e3.high, this.unsigned);
          }, I.or = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low | e3.low, this.high | e3.high, this.unsigned);
          }, I.xor = function(e3) {
            return o2(e3) || (e3 = p(e3)), c(this.low ^ e3.low, this.high ^ e3.high, this.unsigned);
          }, I.shiftLeft = function(e3) {
            return o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63) ? this : e3 < 32 ? c(this.low << e3, this.high << e3 | this.low >>> 32 - e3, this.unsigned) : c(0, this.low << e3 - 32, this.unsigned);
          }, I.shl = I.shiftLeft, I.shiftRight = function(e3) {
            return o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63) ? this : e3 < 32 ? c(this.low >>> e3 | this.high << 32 - e3, this.high >> e3, this.unsigned) : c(this.high >> e3 - 32, this.high >= 0 ? 0 : -1, this.unsigned);
          }, I.shr = I.shiftRight, I.shiftRightUnsigned = function(e3) {
            if (o2(e3) && (e3 = e3.toInt()), 0 == (e3 &= 63))
              return this;
            var t3 = this.high;
            return e3 < 32 ? c(this.low >>> e3 | t3 << 32 - e3, t3 >>> e3, this.unsigned) : c(32 === e3 ? t3 : t3 >>> e3 - 32, 0, this.unsigned);
          }, I.shru = I.shiftRightUnsigned, I.shr_u = I.shiftRightUnsigned, I.toSigned = function() {
            return this.unsigned ? c(this.low, this.high, false) : this;
          }, I.toUnsigned = function() {
            return this.unsigned ? this : c(this.low, this.high, true);
          }, I.toBytes = function(e3) {
            return e3 ? this.toBytesLE() : this.toBytesBE();
          }, I.toBytesLE = function() {
            var e3 = this.high, t3 = this.low;
            return [255 & t3, t3 >>> 8 & 255, t3 >>> 16 & 255, t3 >>> 24, 255 & e3, e3 >>> 8 & 255, e3 >>> 16 & 255, e3 >>> 24];
          }, I.toBytesBE = function() {
            var e3 = this.high, t3 = this.low;
            return [e3 >>> 24, e3 >>> 16 & 255, e3 >>> 8 & 255, 255 & e3, t3 >>> 24, t3 >>> 16 & 255, t3 >>> 8 & 255, 255 & t3];
          }, r2.fromBytes = function(e3, t3, o3) {
            return o3 ? r2.fromBytesLE(e3, t3) : r2.fromBytesBE(e3, t3);
          }, r2.fromBytesLE = function(e3, t3) {
            return new r2(e3[0] | e3[1] << 8 | e3[2] << 16 | e3[3] << 24, e3[4] | e3[5] << 8 | e3[6] << 16 | e3[7] << 24, t3);
          }, r2.fromBytesBE = function(e3, t3) {
            return new r2(e3[4] << 24 | e3[5] << 16 | e3[6] << 8 | e3[7], e3[0] << 24 | e3[1] << 16 | e3[2] << 8 | e3[3], t3);
          };
        }, 365: function(e2, t2, r2) {
          e2.exports = n;
          var o2 = r2(935);
          function n(e3, t3) {
            this.lo = e3 >>> 0, this.hi = t3 >>> 0;
          }
          var i = n.zero = new n(0, 0);
          i.toNumber = function() {
            return 0;
          }, i.zzEncode = i.zzDecode = function() {
            return this;
          }, i.length = function() {
            return 1;
          };
          var a = n.zeroHash = "\0\0\0\0\0\0\0\0";
          n.fromNumber = function(e3) {
            if (0 === e3)
              return i;
            var t3 = e3 < 0;
            t3 && (e3 = -e3);
            var r3 = e3 >>> 0, o3 = (e3 - r3) / 4294967296 >>> 0;
            return t3 && (o3 = ~o3 >>> 0, r3 = ~r3 >>> 0, ++r3 > 4294967295 && (r3 = 0, ++o3 > 4294967295 && (o3 = 0))), new n(r3, o3);
          }, n.from = function(e3) {
            if ("number" == typeof e3)
              return n.fromNumber(e3);
            if ("string" == typeof e3 || e3 instanceof String) {
              if (!o2.Long)
                return n.fromNumber(parseInt(e3, 10));
              e3 = o2.Long.fromString(e3);
            }
            return e3.low || e3.high ? new n(e3.low >>> 0, e3.high >>> 0) : i;
          }, n.prototype.toNumber = function(e3) {
            if (!e3 && this.hi >>> 31) {
              var t3 = 1 + ~this.lo >>> 0, r3 = ~this.hi >>> 0;
              return t3 || (r3 = r3 + 1 >>> 0), -(t3 + 4294967296 * r3);
            }
            return this.lo + 4294967296 * this.hi;
          }, n.prototype.toLong = function(e3) {
            return o2.Long ? new o2.Long(0 | this.lo, 0 | this.hi, Boolean(e3)) : { low: 0 | this.lo, high: 0 | this.hi, unsigned: Boolean(e3) };
          };
          var s = String.prototype.charCodeAt;
          n.fromHash = function(e3) {
            return e3 === a ? i : new n((s.call(e3, 0) | s.call(e3, 1) << 8 | s.call(e3, 2) << 16 | s.call(e3, 3) << 24) >>> 0, (s.call(e3, 4) | s.call(e3, 5) << 8 | s.call(e3, 6) << 16 | s.call(e3, 7) << 24) >>> 0);
          }, n.prototype.toHash = function() {
            return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
          }, n.prototype.zzEncode = function() {
            var e3 = this.hi >> 31;
            return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e3) >>> 0, this.lo = (this.lo << 1 ^ e3) >>> 0, this;
          }, n.prototype.zzDecode = function() {
            var e3 = -(1 & this.lo);
            return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e3) >>> 0, this.hi = (this.hi >>> 1 ^ e3) >>> 0, this;
          }, n.prototype.length = function() {
            var e3 = this.lo, t3 = (this.lo >>> 28 | this.hi << 4) >>> 0, r3 = this.hi >>> 24;
            return 0 === r3 ? 0 === t3 ? e3 < 16384 ? e3 < 128 ? 1 : 2 : e3 < 2097152 ? 3 : 4 : t3 < 16384 ? t3 < 128 ? 5 : 6 : t3 < 2097152 ? 7 : 8 : r3 < 128 ? 9 : 10;
          };
        }, 435: function(e2, t2, r2) {
          e2.exports = a;
          var o2, n, i = r2(286);
          function a(e3, t3, r3, o3, a2, s) {
            if (i.call(this, e3, t3, o3, void 0, void 0, a2, s), !n.isString(r3))
              throw TypeError("keyType must be a string");
            this.keyType = r3, this.resolvedKeyType = null, this.map = true;
          }
          ((a.prototype = Object.create(i.prototype)).constructor = a).className = "MapField", a.fromJSON = function(e3, t3) {
            return new a(e3, t3.id, t3.keyType, t3.type, t3.options, t3.comment);
          }, a.prototype.toJSON = function(e3) {
            var t3 = !!e3 && Boolean(e3.keepComments);
            return n.toObject(["keyType", this.keyType, "type", this.type, "id", this.id, "extend", this.extend, "options", this.options, "comment", t3 ? this.comment : void 0]);
          }, a.prototype.resolve = function() {
            if (this.resolved)
              return this;
            if (void 0 === o2.mapKey[this.keyType])
              throw Error("invalid key type: " + this.keyType);
            return i.prototype.resolve.call(this);
          }, a.d = function(e3, t3, r3) {
            return "function" == typeof r3 ? r3 = n.decorateType(r3).name : r3 && "object" == typeof r3 && (r3 = n.decorateEnum(r3).name), function(o3, i2) {
              n.decorateType(o3.constructor).add(new a(i2, e3, t3, r3));
            };
          }, a._configure = function() {
            o2 = r2(696), n = r2(935);
          };
        }, 339: function(e2, t2, r2) {
          "use strict";
          var o2;
          function n(e3) {
            if (e3)
              for (var t3 = Object.keys(e3), r3 = 0; r3 < t3.length; ++r3)
                this[t3[r3]] = e3[t3[r3]];
          }
          e2.exports = n, n.create = function(e3) {
            return this.$type.create(e3);
          }, n.encode = function(e3, t3) {
            return arguments.length ? 1 == arguments.length ? this.$type.encode(arguments[0]) : this.$type.encode(arguments[0], arguments[1]) : this.$type.encode(this);
          }, n.encodeDelimited = function(e3, t3) {
            return this.$type.encodeDelimited(e3, t3);
          }, n.decode = function(e3) {
            return this.$type.decode(e3);
          }, n.decodeDelimited = function(e3) {
            return this.$type.decodeDelimited(e3);
          }, n.verify = function(e3) {
            return this.$type.verify(e3);
          }, n.fromObject = function(e3) {
            return this.$type.fromObject(e3);
          }, n.toObject = function(e3, t3) {
            return e3 = e3 || this, this.$type.toObject(e3, t3);
          }, n.prototype.toJSON = function() {
            return this.$type.toObject(this, o2.toJSONOptions);
          }, n.set = function(e3, t3) {
            n[e3] = t3;
          }, n.get = function(e3) {
            return n[e3];
          }, n._configure = function() {
            o2 = r2(935);
          };
        }, 484: function(e2, t2, r2) {
          "use strict";
          e2.exports = i;
          var o2, n = r2(998);
          function i(e3, t3, r3, i2, a, s, c, u) {
            if (o2.isObject(a) ? (c = a, a = s = void 0) : o2.isObject(s) && (c = s, s = void 0), void 0 !== t3 && !o2.isString(t3))
              throw TypeError("type must be a string");
            if (!o2.isString(r3))
              throw TypeError("requestType must be a string");
            if (!o2.isString(i2))
              throw TypeError("responseType must be a string");
            n.call(this, e3, c), this.type = t3 || "rpc", this.requestType = r3, this.requestStream = !!a || void 0, this.responseType = i2, this.responseStream = !!s || void 0, this.resolvedRequestType = null, this.resolvedResponseType = null, this.comment = u;
          }
          ((i.prototype = Object.create(n.prototype)).constructor = i).className = "Method", i.fromJSON = function(e3, t3) {
            return new i(e3, t3.type, t3.requestType, t3.responseType, t3.requestStream, t3.responseStream, t3.options, t3.comment);
          }, i.prototype.toJSON = function(e3) {
            var t3 = !!e3 && Boolean(e3.keepComments);
            return o2.toObject(["type", "rpc" !== this.type && this.type || void 0, "requestType", this.requestType, "requestStream", this.requestStream, "responseType", this.responseType, "responseStream", this.responseStream, "options", this.options, "comment", t3 ? this.comment : void 0]);
          }, i.prototype.resolve = function() {
            return this.resolved ? this : (this.resolvedRequestType = this.parent.lookupType(this.requestType), this.resolvedResponseType = this.parent.lookupType(this.responseType), n.prototype.resolve.call(this));
          }, i._configure = function() {
            o2 = r2(935);
          };
        }, 476: function(e2, t2, r2) {
          e2.exports = l;
          var o2, n, i, a, s, c = r2(998);
          function u(e3, t3) {
            if (e3 && e3.length) {
              for (var r3 = {}, o3 = 0; o3 < e3.length; ++o3)
                r3[e3[o3].name] = e3[o3].toJSON(t3);
              return r3;
            }
          }
          function l(e3, t3) {
            c.call(this, e3, t3), this.nested = void 0, this._nestedArray = null;
          }
          function p(e3) {
            return e3._nestedArray = null, e3;
          }
          ((l.prototype = Object.create(c.prototype)).constructor = l).className = "Namespace", l.fromJSON = function(e3, t3) {
            return new l(e3, t3.options).addJSON(t3.nested);
          }, l.arrayToJSON = u, l.isReservedId = function(e3, t3) {
            if (e3) {
              for (var r3 = 0; r3 < e3.length; ++r3)
                if ("string" != typeof e3[r3] && e3[r3][0] <= t3 && e3[r3][1] >= t3)
                  return true;
            }
            return false;
          }, l.isReservedName = function(e3, t3) {
            if (e3) {
              for (var r3 = 0; r3 < e3.length; ++r3)
                if (e3[r3] === t3)
                  return true;
            }
            return false;
          }, Object.defineProperty(l.prototype, "nestedArray", { get: function() {
            return this._nestedArray || (this._nestedArray = i.toArray(this.nested));
          } }), l.prototype.toJSON = function(e3) {
            return i.toObject(["options", this.options, "nested", u(this.nestedArray, e3)]);
          }, l.prototype.addJSON = function(e3) {
            if (e3)
              for (var t3, r3 = Object.keys(e3), i2 = 0; i2 < r3.length; ++i2)
                t3 = e3[r3[i2]], this.add((void 0 !== t3.fields ? a.fromJSON : void 0 !== t3.values ? o2.fromJSON : void 0 !== t3.methods ? s.fromJSON : void 0 !== t3.id ? n.fromJSON : l.fromJSON)(r3[i2], t3));
            return this;
          }, l.prototype.get = function(e3) {
            return this.nested && this.nested[e3] || null;
          }, l.prototype.getEnum = function(e3) {
            if (this.nested && this.nested[e3] instanceof o2)
              return this.nested[e3].values;
            throw Error("no such enum: " + e3);
          }, l.prototype.add = function(e3) {
            if (!(e3 instanceof n && void 0 !== e3.extend || e3 instanceof a || e3 instanceof o2 || e3 instanceof s || e3 instanceof l))
              throw TypeError("object must be a valid nested object");
            if (this.nested) {
              var t3 = this.get(e3.name);
              if (t3) {
                if (!(t3 instanceof l && e3 instanceof l) || t3 instanceof a || t3 instanceof s)
                  throw Error("duplicate name '" + e3.name + "' in " + this);
                for (var r3 = t3.nestedArray, i2 = 0; i2 < r3.length; ++i2)
                  e3.add(r3[i2]);
                this.remove(t3), this.nested || (this.nested = {}), e3.setOptions(t3.options, true);
              }
            } else
              this.nested = {};
            return this.nested[e3.name] = e3, e3.onAdd(this), p(this);
          }, l.prototype.remove = function(e3) {
            if (!(e3 instanceof c))
              throw TypeError("object must be a ReflectionObject");
            if (e3.parent !== this)
              throw Error(e3 + " is not a member of " + this);
            return delete this.nested[e3.name], Object.keys(this.nested).length || (this.nested = void 0), e3.onRemove(this), p(this);
          }, l.prototype.define = function(e3, t3) {
            if (i.isString(e3))
              e3 = e3.split(".");
            else if (!Array.isArray(e3))
              throw TypeError("illegal path");
            if (e3 && e3.length && "" === e3[0])
              throw Error("path must be relative");
            for (var r3 = this; e3.length > 0; ) {
              var o3 = e3.shift();
              if (r3.nested && r3.nested[o3]) {
                if (!((r3 = r3.nested[o3]) instanceof l))
                  throw Error("path conflicts with non-namespace objects");
              } else
                r3.add(r3 = new l(o3));
            }
            return t3 && r3.addJSON(t3), r3;
          }, l.prototype.resolveAll = function() {
            for (var e3 = this.nestedArray, t3 = 0; t3 < e3.length; )
              e3[t3] instanceof l ? e3[t3++].resolveAll() : e3[t3++].resolve();
            return this.resolve();
          }, l.prototype.lookup = function(e3, t3, r3) {
            if ("boolean" == typeof t3 ? (r3 = t3, t3 = void 0) : t3 && !Array.isArray(t3) && (t3 = [t3]), i.isString(e3) && e3.length) {
              if ("." === e3)
                return this.root;
              e3 = e3.split(".");
            } else if (!e3.length)
              return this;
            if ("" === e3[0])
              return this.root.lookup(e3.slice(1), t3);
            var o3 = this.get(e3[0]);
            if (o3) {
              if (1 === e3.length) {
                if (!t3 || t3.indexOf(o3.constructor) > -1)
                  return o3;
              } else if (o3 instanceof l && (o3 = o3.lookup(e3.slice(1), t3, true)))
                return o3;
            } else
              for (var n2 = 0; n2 < this.nestedArray.length; ++n2)
                if (this._nestedArray[n2] instanceof l && (o3 = this._nestedArray[n2].lookup(e3, t3, true)))
                  return o3;
            return null === this.parent || r3 ? null : this.parent.lookup(e3, t3);
          }, l.prototype.lookupType = function(e3) {
            var t3 = this.lookup(e3, [a]);
            if (!t3)
              throw Error("no such type: " + e3);
            return t3;
          }, l.prototype.lookupEnum = function(e3) {
            var t3 = this.lookup(e3, [o2]);
            if (!t3)
              throw Error("no such Enum '" + e3 + "' in " + this);
            return t3;
          }, l.prototype.lookupTypeOrEnum = function(e3) {
            var t3 = this.lookup(e3, [a, o2]);
            if (!t3)
              throw Error("no such Type or Enum '" + e3 + "' in " + this);
            return t3;
          }, l.prototype.lookupService = function(e3) {
            var t3 = this.lookup(e3, [s]);
            if (!t3)
              throw Error("no such Service '" + e3 + "' in " + this);
            return t3;
          }, l._configure = function() {
            o2 = r2(582), n = r2(286), i = r2(935), a = r2(192), s = r2(447);
          };
        }, 998: function(e2, t2, r2) {
          "use strict";
          var o2, n;
          function i(e3, t3) {
            if (!o2.isString(e3))
              throw TypeError("name must be a string");
            if (t3 && !o2.isObject(t3))
              throw TypeError("options must be an object");
            this.options = t3, this.name = e3, this.parent = null, this.resolved = false, this.comment = null, this.filename = null;
          }
          e2.exports = i, i.className = "ReflectionObject", Object.defineProperties(i.prototype, { root: { get: function() {
            for (var e3 = this; null !== e3.parent; )
              e3 = e3.parent;
            return e3;
          } }, fullName: { get: function() {
            for (var e3 = [this.name], t3 = this.parent; t3; )
              e3.unshift(t3.name), t3 = t3.parent;
            return e3.join(".");
          } } }), i.prototype.toJSON = function() {
            throw Error();
          }, i.prototype.onAdd = function(e3) {
            this.parent && this.parent !== e3 && this.parent.remove(this), this.parent = e3, this.resolved = false;
            var t3 = e3.root;
            t3 instanceof n && t3._handleAdd(this);
          }, i.prototype.onRemove = function(e3) {
            var t3 = e3.root;
            t3 instanceof n && t3._handleRemove(this), this.parent = null, this.resolved = false;
          }, i.prototype.resolve = function() {
            return this.resolved || this.root instanceof n && (this.resolved = true), this;
          }, i.prototype.getOption = function(e3) {
            if (this.options)
              return this.options[e3];
          }, i.prototype.setOption = function(e3, t3, r3) {
            return r3 && this.options && void 0 !== this.options[e3] || ((this.options || (this.options = {}))[e3] = t3), this;
          }, i.prototype.setOptions = function(e3, t3) {
            if (e3)
              for (var r3 = Object.keys(e3), o3 = 0; o3 < r3.length; ++o3)
                this.setOption(r3[o3], e3[r3[o3]], t3);
            return this;
          }, i.prototype.toString = function() {
            var e3 = this.constructor.className, t3 = this.fullName;
            return t3.length ? e3 + " " + t3 : e3;
          }, i._configure = function(e3) {
            n = r2(685), o2 = r2(935);
          };
        }, 735: function(e2, t2, r2) {
          e2.exports = a;
          var o2, n, i = r2(998);
          function a(e3, t3, r3, o3) {
            if (Array.isArray(t3) || (r3 = t3, t3 = void 0), i.call(this, e3, r3), void 0 !== t3 && !Array.isArray(t3))
              throw TypeError("fieldNames must be an Array");
            this.oneof = t3 || [], this.fieldsArray = [], this.comment = o3;
          }
          function s(e3) {
            if (e3.parent)
              for (var t3 = 0; t3 < e3.fieldsArray.length; ++t3)
                e3.fieldsArray[t3].parent || e3.parent.add(e3.fieldsArray[t3]);
          }
          ((a.prototype = Object.create(i.prototype)).constructor = a).className = "OneOf", a.fromJSON = function(e3, t3) {
            return new a(e3, t3.oneof, t3.options, t3.comment);
          }, a.prototype.toJSON = function(e3) {
            var t3 = !!e3 && Boolean(e3.keepComments);
            return n.toObject(["options", this.options, "oneof", this.oneof, "comment", t3 ? this.comment : void 0]);
          }, a.prototype.add = function(e3) {
            if (!(e3 instanceof o2))
              throw TypeError("field must be a Field");
            return e3.parent && e3.parent !== this.parent && e3.parent.remove(e3), this.oneof.push(e3.name), this.fieldsArray.push(e3), e3.partOf = this, s(this), this;
          }, a.prototype.remove = function(e3) {
            if (!(e3 instanceof o2))
              throw TypeError("field must be a Field");
            var t3 = this.fieldsArray.indexOf(e3);
            if (t3 < 0)
              throw Error(e3 + " is not a member of " + this);
            return this.fieldsArray.splice(t3, 1), (t3 = this.oneof.indexOf(e3.name)) > -1 && this.oneof.splice(t3, 1), e3.partOf = null, this;
          }, a.prototype.onAdd = function(e3) {
            i.prototype.onAdd.call(this, e3);
            for (var t3 = 0; t3 < this.oneof.length; ++t3) {
              var r3 = e3.get(this.oneof[t3]);
              r3 && !r3.partOf && (r3.partOf = this, this.fieldsArray.push(r3));
            }
            s(this);
          }, a.prototype.onRemove = function(e3) {
            for (var t3, r3 = 0; r3 < this.fieldsArray.length; ++r3)
              (t3 = this.fieldsArray[r3]).parent && t3.parent.remove(t3);
            i.prototype.onRemove.call(this, e3);
          }, a.d = function() {
            for (var e3 = new Array(arguments.length), t3 = 0; t3 < arguments.length; )
              e3[t3] = arguments[t3++];
            return function(t4, r3) {
              n.decorateType(t4.constructor).add(new a(r3, e3)), Object.defineProperty(t4, r3, { get: n.oneOfGetter(e3), set: n.oneOfSetter(e3) });
            };
          }, a._configure = function() {
            o2 = r2(286), n = r2(935);
          };
        }, 845: function(e2, t2, r2) {
          "use strict";
          var o2, n, i, a, s, c, u, l, p, d, h;
          e2.exports = I, I.filename = null, I.defaults = { keepCase: false };
          var f = /^[1-9][0-9]*$/, m = /^-?[1-9][0-9]*$/, g = /^0[x][0-9a-fA-F]+$/, E = /^-?0[x][0-9a-fA-F]+$/, y = /^0[0-7]+$/, T = /^-?0[0-7]+$/, _ = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/, v = /^[a-zA-Z_][a-zA-Z_0-9]*$/, O = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/, R = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;
          function I(e3, t3, r3) {
            t3 instanceof n || (r3 = t3, t3 = new n()), r3 || (r3 = I.defaults);
            var S, C, N, A, M, b = o2(e3, r3.alternateCommentMode || false), U = b.next, w = b.push, k = b.peek, P = b.skip, L = b.cmnt, D = true, G = false, x = t3, B = r3.keepCase ? function(e4) {
              return e4;
            } : h.camelCase;
            function H(e4, t4, r4) {
              var o3 = I.filename;
              return r4 || (I.filename = null), Error("illegal " + (t4 || "token") + " '" + e4 + "' (" + (o3 ? o3 + ", " : "") + "line " + b.line + ")");
            }
            function j() {
              var e4, t4 = [];
              do {
                if ('"' !== (e4 = U()) && "'" !== e4)
                  throw H(e4);
                t4.push(U()), P(e4), e4 = k();
              } while ('"' === e4 || "'" === e4);
              return t4.join("");
            }
            function F(e4) {
              var t4 = U();
              switch (t4) {
                case "'":
                case '"':
                  return w(t4), j();
                case "true":
                case "TRUE":
                  return true;
                case "false":
                case "FALSE":
                  return false;
              }
              try {
                return function(e5, t5) {
                  var r4 = 1;
                  switch ("-" === e5.charAt(0) && (r4 = -1, e5 = e5.substring(1)), e5) {
                    case "inf":
                    case "INF":
                    case "Inf":
                      return r4 * (1 / 0);
                    case "nan":
                    case "NAN":
                    case "Nan":
                    case "NaN":
                      return NaN;
                    case "0":
                      return 0;
                  }
                  if (f.test(e5))
                    return r4 * parseInt(e5, 10);
                  if (g.test(e5))
                    return r4 * parseInt(e5, 16);
                  if (y.test(e5))
                    return r4 * parseInt(e5, 8);
                  if (_.test(e5))
                    return r4 * parseFloat(e5);
                  throw H(e5, "number", true);
                }(t4);
              } catch (r4) {
                if (e4 && O.test(t4))
                  return t4;
                throw H(t4, "value");
              }
            }
            function W(e4, t4) {
              var r4, o3;
              do {
                !t4 || '"' !== (r4 = k()) && "'" !== r4 ? e4.push([o3 = q(U()), P("to", true) ? q(U()) : o3]) : e4.push(j());
              } while (P(",", true));
              P(";");
            }
            function q(e4, t4) {
              switch (e4) {
                case "max":
                case "MAX":
                case "Max":
                  return 536870911;
                case "0":
                  return 0;
              }
              if (!t4 && "-" === e4.charAt(0))
                throw H(e4, "id");
              if (m.test(e4))
                return parseInt(e4, 10);
              if (E.test(e4))
                return parseInt(e4, 16);
              if (T.test(e4))
                return parseInt(e4, 8);
              throw H(e4, "id");
            }
            function K() {
              if (void 0 !== S)
                throw H("package");
              if (S = U(), !O.test(S))
                throw H(S, "name");
              x = x.define(S), P(";");
            }
            function V() {
              var e4, t4 = k();
              switch (t4) {
                case "weak":
                  e4 = N || (N = []), U();
                  break;
                case "public":
                  U();
                default:
                  e4 = C || (C = []);
              }
              t4 = j(), P(";"), e4.push(t4);
            }
            function z() {
              if (P("="), A = j(), !(G = "proto3" === A) && "proto2" !== A)
                throw H(A, "syntax");
              P(";");
            }
            function J(e4, t4) {
              switch (t4) {
                case "option":
                  return Q(e4, t4), P(";"), true;
                case "message":
                  return function(e5, t5) {
                    if (!v.test(t5 = U()))
                      throw H(t5, "type name");
                    var r4 = new i(t5);
                    X(r4, function(e6) {
                      if (!J(r4, e6))
                        switch (e6) {
                          case "map":
                            !function(e7) {
                              P("<");
                              var t6 = U();
                              if (void 0 === d.mapKey[t6])
                                throw H(t6, "type");
                              P(",");
                              var r5 = U();
                              if (!O.test(r5))
                                throw H(r5, "type");
                              P(">");
                              var o3 = U();
                              if (!v.test(o3))
                                throw H(o3, "name");
                              P("=");
                              var n2 = new s(B(o3), q(U()), t6, r5);
                              X(n2, function(e8) {
                                if ("option" !== e8)
                                  throw H(e8);
                                Q(n2, e8), P(";");
                              }, function() {
                                ee(n2);
                              }), e7.add(n2);
                            }(r4);
                            break;
                          case "required":
                          case "optional":
                          case "repeated":
                            Y(r4, e6);
                            break;
                          case "oneof":
                            !function(e7, t6) {
                              if (!v.test(t6 = U()))
                                throw H(t6, "name");
                              var r5 = new c(B(t6));
                              X(r5, function(e8) {
                                "option" === e8 ? (Q(r5, e8), P(";")) : (w(e8), Y(r5, "optional"));
                              }), e7.add(r5);
                            }(r4, e6);
                            break;
                          case "extensions":
                            W(r4.extensions || (r4.extensions = []));
                            break;
                          case "reserved":
                            W(r4.reserved || (r4.reserved = []), true);
                            break;
                          default:
                            if (!G || !O.test(e6))
                              throw H(e6);
                            w(e6), Y(r4, "optional");
                        }
                    }), e5.add(r4);
                  }(e4, t4), true;
                case "enum":
                  return function(e5, t5) {
                    if (!v.test(t5 = U()))
                      throw H(t5, "name");
                    var r4 = new u(t5);
                    X(r4, function(e6) {
                      switch (e6) {
                        case "option":
                          Q(r4, e6), P(";");
                          break;
                        case "reserved":
                          W(r4.reserved || (r4.reserved = []), true);
                          break;
                        default:
                          !function(e7, t6) {
                            if (!v.test(t6))
                              throw H(t6, "name");
                            P("=");
                            var r5 = q(U(), true), o3 = {};
                            X(o3, function(e8) {
                              if ("option" !== e8)
                                throw H(e8);
                              Q(o3, e8), P(";");
                            }, function() {
                              ee(o3);
                            }), e7.add(t6, r5, o3.comment);
                          }(r4, e6);
                      }
                    }), e5.add(r4);
                  }(e4, t4), true;
                case "service":
                  return function(e5, t5) {
                    if (!v.test(t5 = U()))
                      throw H(t5, "service name");
                    var r4 = new l(t5);
                    X(r4, function(e6) {
                      if (!J(r4, e6)) {
                        if ("rpc" !== e6)
                          throw H(e6);
                        !function(e7, t6) {
                          var r5 = t6;
                          if (!v.test(t6 = U()))
                            throw H(t6, "name");
                          var o3, n2, i2, a2, s2 = t6;
                          if (P("("), P("stream", true) && (n2 = true), !O.test(t6 = U()))
                            throw H(t6);
                          if (o3 = t6, P(")"), P("returns"), P("("), P("stream", true) && (a2 = true), !O.test(t6 = U()))
                            throw H(t6);
                          i2 = t6, P(")");
                          var c2 = new p(s2, r5, o3, i2, n2, a2);
                          X(c2, function(e8) {
                            if ("option" !== e8)
                              throw H(e8);
                            Q(c2, e8), P(";");
                          }), e7.add(c2);
                        }(r4, e6);
                      }
                    }), e5.add(r4);
                  }(e4, t4), true;
                case "extend":
                  return function(e5, t5) {
                    if (!O.test(t5 = U()))
                      throw H(t5, "reference");
                    var r4 = t5;
                    X(null, function(t6) {
                      switch (t6) {
                        case "required":
                        case "repeated":
                        case "optional":
                          Y(e5, t6, r4);
                          break;
                        default:
                          if (!G || !O.test(t6))
                            throw H(t6);
                          w(t6), Y(e5, "optional", r4);
                      }
                    });
                  }(e4, t4), true;
              }
              return false;
            }
            function X(e4, t4, r4) {
              var o3 = b.line;
              if (e4 && (e4.comment = L(), e4.filename = I.filename), P("{", true)) {
                for (var n2; "}" !== (n2 = U()); )
                  t4(n2);
                P(";", true);
              } else
                r4 && r4(), P(";"), e4 && "string" != typeof e4.comment && (e4.comment = L(o3));
            }
            function Y(e4, t4, r4) {
              var o3 = U();
              if ("group" !== o3) {
                if (!O.test(o3))
                  throw H(o3, "type");
                var n2 = U();
                if (!v.test(n2))
                  throw H(n2, "name");
                n2 = B(n2), P("=");
                var s2 = new a(n2, q(U()), o3, t4, r4);
                X(s2, function(e5) {
                  if ("option" !== e5)
                    throw H(e5);
                  Q(s2, e5), P(";");
                }, function() {
                  ee(s2);
                }), e4.add(s2), G || !s2.repeated || void 0 === d.packed[o3] && void 0 !== d.basic[o3] || s2.setOption("packed", false, true);
              } else
                !function(e5, t5) {
                  var r5 = U();
                  if (!v.test(r5))
                    throw H(r5, "name");
                  var o4 = h.lcFirst(r5);
                  r5 === o4 && (r5 = h.ucFirst(r5)), P("=");
                  var n3 = q(U()), s3 = new i(r5);
                  s3.group = true;
                  var c2 = new a(o4, n3, r5, t5);
                  c2.filename = I.filename, X(s3, function(e6) {
                    switch (e6) {
                      case "option":
                        Q(s3, e6), P(";");
                        break;
                      case "required":
                      case "optional":
                      case "repeated":
                        Y(s3, e6);
                        break;
                      default:
                        throw H(e6);
                    }
                  }), e5.add(s3).add(c2);
                }(e4, t4);
            }
            function Q(e4, t4) {
              var r4 = P("(", true);
              if (!O.test(t4 = U()))
                throw H(t4, "name");
              var o3 = t4;
              r4 && (P(")"), o3 = "(" + o3 + ")", t4 = k(), R.test(t4) && (o3 += t4, U())), P("="), $2(e4, o3);
            }
            function $2(e4, t4) {
              if (P("{", true))
                do {
                  if (!v.test(M = U()))
                    throw H(M, "name");
                  "{" === k() ? $2(e4, t4 + "." + M) : (P(":"), "{" === k() ? $2(e4, t4 + "." + M) : Z(e4, t4 + "." + M, F(true)));
                } while (!P("}", true));
              else
                Z(e4, t4, F(true));
            }
            function Z(e4, t4, r4) {
              e4.setOption && e4.setOption(t4, r4);
            }
            function ee(e4) {
              if (P("[", true)) {
                do {
                  Q(e4, "option");
                } while (P(",", true));
                P("]");
              }
              return e4;
            }
            for (; null !== (M = U()); )
              switch (M) {
                case "package":
                  if (!D)
                    throw H(M);
                  K();
                  break;
                case "import":
                  if (!D)
                    throw H(M);
                  V();
                  break;
                case "syntax":
                  if (!D)
                    throw H(M);
                  z();
                  break;
                case "option":
                  if (!D)
                    throw H(M);
                  Q(x, M), P(";");
                  break;
                default:
                  if (J(x, M)) {
                    D = false;
                    continue;
                  }
                  throw H(M);
              }
            return I.filename = null, { package: S, imports: C, weakImports: N, syntax: A, root: t3 };
          }
          I._configure = function() {
            o2 = r2(869), n = r2(685), i = r2(192), a = r2(286), s = r2(435), c = r2(735), u = r2(582), l = r2(447), p = r2(484), d = r2(696), h = r2(935);
          };
        }, 444: function(e2) {
          var t2 = e2.exports, r2 = t2.isAbsolute = function(e3) {
            return /^(?:\/|\w+:)/.test(e3);
          }, o2 = t2.normalize = function(e3) {
            var t3 = (e3 = e3.replace(/\\/g, "/").replace(/\/{2,}/g, "/")).split("/"), o3 = r2(e3), n = "";
            o3 && (n = t3.shift() + "/");
            for (var i = 0; i < t3.length; )
              ".." === t3[i] ? i > 0 && ".." !== t3[i - 1] ? t3.splice(--i, 2) : o3 ? t3.splice(i, 1) : ++i : "." === t3[i] ? t3.splice(i, 1) : ++i;
            return n + t3.join("/");
          };
          t2.resolve = function(e3, t3, n) {
            return n || (t3 = o2(t3)), r2(t3) ? t3 : (n || (e3 = o2(e3)), (e3 = e3.replace(/(?:\/|^)[^/]+$/, "")).length ? o2(e3 + "/" + t3) : t3);
          };
        }, 997: function(e2) {
          e2.exports = function(e3, t2, r2) {
            var o2 = r2 || 8192, n = o2 >>> 1, i = null, a = o2;
            return function(r3) {
              if (r3 < 1 || r3 > n)
                return e3(r3);
              a + r3 > o2 && (i = e3(o2), a = 0);
              var s = t2.call(i, a, a += r3);
              return 7 & a && (a = 1 + (7 | a)), s;
            };
          };
        }, 494: function(e2, t2, r2) {
          e2.exports = s;
          var o2, n, i = r2(935);
          function a(e3, t3) {
            return RangeError("index out of range: " + e3.pos + " + " + (t3 || 1) + " > " + e3.len);
          }
          function s(e3) {
            this.buf = e3, this.pos = 0, this.len = e3.length;
          }
          var c, u = "undefined" != typeof Uint8Array ? function(e3) {
            return e3 instanceof Uint8Array || Array.isArray(e3) ? new s(e3) : ("undefined" != typeof ArrayBuffer && e3 instanceof ArrayBuffer && console.warn(""), new s(new Uint8Array(e3)));
          } : function(e3) {
            if (Array.isArray(e3))
              return new s(e3);
          };
          function l() {
            var e3 = new o2(0, 0), t3 = 0;
            if (!(this.len - this.pos > 4)) {
              for (; t3 < 3; ++t3) {
                if (this.pos >= this.len)
                  throw a(this);
                if (e3.lo = (e3.lo | (127 & this.buf[this.pos]) << 7 * t3) >>> 0, this.buf[this.pos++] < 128)
                  return e3;
              }
              return e3.lo = (e3.lo | (127 & this.buf[this.pos++]) << 7 * t3) >>> 0, e3;
            }
            for (; t3 < 4; ++t3)
              if (e3.lo = (e3.lo | (127 & this.buf[this.pos]) << 7 * t3) >>> 0, this.buf[this.pos++] < 128)
                return e3;
            if (e3.lo = (e3.lo | (127 & this.buf[this.pos]) << 28) >>> 0, e3.hi = (e3.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128)
              return e3;
            if (t3 = 0, this.len - this.pos > 4) {
              for (; t3 < 5; ++t3)
                if (e3.hi = (e3.hi | (127 & this.buf[this.pos]) << 7 * t3 + 3) >>> 0, this.buf[this.pos++] < 128)
                  return e3;
            } else
              for (; t3 < 5; ++t3) {
                if (this.pos >= this.len)
                  throw a(this);
                if (e3.hi = (e3.hi | (127 & this.buf[this.pos]) << 7 * t3 + 3) >>> 0, this.buf[this.pos++] < 128)
                  return e3;
              }
            throw Error("invalid varint encoding");
          }
          function p(e3, t3) {
            return (e3[t3 - 4] | e3[t3 - 3] << 8 | e3[t3 - 2] << 16 | e3[t3 - 1] << 24) >>> 0;
          }
          function d() {
            if (this.pos + 8 > this.len)
              throw a(this, 8);
            return new o2(p(this.buf, this.pos += 4), p(this.buf, this.pos += 4));
          }
          s.create = i.Buffer ? function(e3) {
            return (s.create = function(e4) {
              return i.Buffer.isBuffer(e4) ? new (void 0)(e4) : u(e4);
            })(e3);
          } : u, s.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice, s.prototype.uint32 = (c = 4294967295, function() {
            if (c = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128)
              return c;
            if (c = (c | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128)
              return c;
            if (c = (c | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128)
              return c;
            if (c = (c | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128)
              return c;
            if (c = (c | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128)
              return c;
            if ((this.pos += 5) > this.len)
              throw this.pos = this.len, a(this, 10);
            return c;
          }), s.prototype.int32 = function() {
            return 0 | this.uint32();
          }, s.prototype.sint32 = function() {
            var e3 = this.uint32();
            return e3 >>> 1 ^ -(1 & e3) | 0;
          }, s.prototype.bool = function() {
            return 0 !== this.uint32();
          }, s.prototype.fixed32 = function() {
            if (this.pos + 4 > this.len)
              throw a(this, 4);
            return p(this.buf, this.pos += 4);
          }, s.prototype.sfixed32 = function() {
            if (this.pos + 4 > this.len)
              throw a(this, 4);
            return 0 | p(this.buf, this.pos += 4);
          }, s.prototype.float = function() {
            if (this.pos + 4 > this.len)
              throw a(this, 4);
            var e3 = i.float.readFloatLE(this.buf, this.pos);
            return this.pos += 4, e3;
          }, s.prototype.double = function() {
            if (this.pos + 8 > this.len)
              throw a(this, 4);
            var e3 = i.float.readDoubleLE(this.buf, this.pos);
            return this.pos += 8, e3;
          }, s.prototype.bytes = function() {
            var e3 = this.uint32(), t3 = this.pos, r3 = this.pos + e3;
            if (r3 > this.len)
              throw a(this, e3);
            return this.pos += e3, Array.isArray(this.buf) ? this.buf.slice(t3, r3) : t3 === r3 ? new this.buf.constructor(0) : this._slice.call(this.buf, t3, r3);
          }, s.prototype.string = function() {
            var e3 = this.bytes();
            return n.read(e3, 0, e3.length);
          }, s.prototype.skip = function(e3) {
            if ("number" == typeof e3) {
              if (this.pos + e3 > this.len)
                throw a(this, e3);
              this.pos += e3;
            } else
              do {
                if (this.pos >= this.len)
                  throw a(this);
              } while (128 & this.buf[this.pos++]);
            return this;
          }, s.prototype.skipType = function(e3) {
            switch (e3) {
              case 0:
                this.skip();
                break;
              case 1:
                this.skip(8);
                break;
              case 2:
                this.skip(this.uint32());
                break;
              case 3:
                for (; 4 != (e3 = 7 & this.uint32()); )
                  this.skipType(e3);
                break;
              case 5:
                this.skip(4);
                break;
              default:
                throw Error("invalid wire type " + e3 + " at offset " + this.pos);
            }
            return this;
          }, s._configure = function() {
            o2 = r2(365), n = r2(498);
            var e3 = i.Long ? "toLong" : "toNumber";
            i.merge(s.prototype, { int64: function() {
              return l.call(this)[e3](false);
            }, uint64: function() {
              return l.call(this)[e3](true);
            }, sint64: function() {
              return l.call(this).zzDecode()[e3](false);
            }, fixed64: function() {
              return d.call(this)[e3](true);
            }, sfixed64: function() {
              return d.call(this)[e3](false);
            } });
          };
        }, 685: function(e2, t2, r2) {
          e2.exports = p;
          var o2 = r2(476);
          ((p.prototype = Object.create(o2.prototype)).constructor = p).className = "Root";
          var n, i, a, s = r2(286), c = r2(582), u = r2(735), l = r2(935);
          function p(e3) {
            o2.call(this, "", e3), this.deferred = [], this.files = [], this.names = [];
          }
          function d() {
          }
          p.fromJSON = function(e3, t3) {
            return e3 = "string" == typeof e3 ? JSON.parse(e3) : e3, t3 || (t3 = new p()), e3.options && t3.setOptions(e3.options), t3.addJSON(e3.nested);
          }, p.prototype.resolvePath = l.path.resolve, p.prototype.parseFromPbString = function e3(t3, r3, o3) {
            "function" == typeof r3 && (o3 = r3, r3 = void 0);
            var n2 = this;
            if (!o3)
              return l.asPromise(e3, n2, t3, r3);
            var s2 = null;
            if ("string" == typeof t3)
              s2 = JSON.parse(t3);
            else {
              if ("object" != typeof t3)
                return void console.log("pb格式转化失败");
              s2 = t3;
            }
            function c2(e4, t4) {
              if (o3) {
                var r4 = o3;
                o3 = null, r4(e4, t4);
              }
            }
            function u2(e4, t4) {
              try {
                if (l.isString(t4) && "{" === t4.charAt(0) && (t4 = JSON.parse(t4)), l.isString(t4)) {
                  i.filename = e4;
                  var o4, a2 = i(t4, n2, r3), s3 = 0;
                  if (a2.imports)
                    for (; s3 < a2.imports.length; ++s3)
                      p2(o4 = a2.imports[s3]);
                  if (a2.weakImports) {
                    for (s3 = 0; s3 < a2.weakImports.length; ++s3)
                      o4 = a2.weakImports[s3];
                    p2(o4);
                  }
                } else
                  n2.setOptions(t4.options).addJSON(t4.nested);
              } catch (e5) {
                c2(e5);
              }
              c2(null, n2);
            }
            function p2(e4) {
              n2.names.indexOf(e4) > -1 || (n2.names.push(e4), e4 in a && u2(e4, a[e4]));
            }
            u2(s2.name, s2.pbJsonStr);
          }, p.prototype.load = function e3(t3, r3, o3) {
            "function" == typeof r3 && (o3 = r3, r3 = void 0);
            var n2 = this;
            if (!o3)
              return l.asPromise(e3, n2, t3, r3);
            var s2 = o3 === d;
            function c2(e4, t4) {
              if (o3) {
                var r4 = o3;
                if (o3 = null, s2)
                  throw e4;
                r4(e4, t4);
              }
            }
            function u2(e4, t4) {
              try {
                if (l.isString(t4) && "{" === t4.charAt(0) && (t4 = JSON.parse(t4)), l.isString(t4)) {
                  i.filename = e4;
                  var o4, a2 = i(t4, n2, r3), u3 = 0;
                  if (a2.imports)
                    for (; u3 < a2.imports.length; ++u3)
                      (o4 = n2.resolvePath(e4, a2.imports[u3])) && p2(o4);
                  if (a2.weakImports)
                    for (u3 = 0; u3 < a2.weakImports.length; ++u3)
                      (o4 = n2.resolvePath(e4, a2.weakImports[u3])) && p2(o4, true);
                } else
                  n2.setOptions(t4.options).addJSON(t4.nested);
              } catch (e5) {
                c2(e5);
              }
              s2 || h2 || c2(null, n2);
            }
            function p2(e4, t4) {
              var r4 = e4.lastIndexOf("google/protobuf/");
              if (r4 > -1) {
                var i2 = e4.substring(r4);
                i2 in a && (e4 = i2);
              }
              if (!(n2.files.indexOf(e4) > -1))
                if (n2.files.push(e4), e4 in a)
                  s2 ? u2(e4, a[e4]) : (++h2, setTimeout(function() {
                    --h2, u2(e4, a[e4]);
                  }));
                else if (s2) {
                  var p3;
                  try {
                    p3 = l.fs.readFileSync(e4).toString("utf8");
                  } catch (e5) {
                    return void (t4 || c2(e5));
                  }
                  u2(e4, p3);
                } else
                  ++h2, l.fetch(e4, function(r5, i3) {
                    --h2, o3 && (r5 ? t4 ? h2 || c2(null, n2) : c2(r5) : u2(e4, i3));
                  });
            }
            var h2 = 0;
            l.isString(t3) && (t3 = [t3]);
            for (var f2, m = 0; m < t3.length; ++m)
              (f2 = n2.resolvePath("", t3[m])) && p2(f2);
            if (s2)
              return n2;
            h2 || c2(null, n2);
          }, p.prototype.loadSync = function(e3, t3) {
            if (!l.isNode)
              throw Error("not supported");
            return this.load(e3, t3, d);
          }, p.prototype.resolveAll = function() {
            if (this.deferred.length)
              throw Error("unresolvable extensions: " + this.deferred.map(function(e3) {
                return "'extend " + e3.extend + "' in " + e3.parent.fullName;
              }).join(", "));
            return o2.prototype.resolveAll.call(this);
          };
          var h = /^[A-Z]/;
          function f(e3, t3) {
            var r3 = t3.parent.lookup(t3.extend);
            if (r3) {
              var o3 = new s(t3.fullName, t3.id, t3.type, t3.rule, void 0, t3.options);
              return o3.declaringField = t3, t3.extensionField = o3, r3.add(o3), true;
            }
            return false;
          }
          p.prototype._handleAdd = function(e3) {
            if (e3 instanceof s)
              void 0 === e3.extend || e3.extensionField || f(0, e3) || this.deferred.push(e3);
            else if (e3 instanceof c)
              h.test(e3.name) && (e3.parent[e3.name] = e3.values);
            else if (!(e3 instanceof u)) {
              if (e3 instanceof n)
                for (var t3 = 0; t3 < this.deferred.length; )
                  f(0, this.deferred[t3]) ? this.deferred.splice(t3, 1) : ++t3;
              for (var r3 = 0; r3 < e3.nestedArray.length; ++r3)
                this._handleAdd(e3._nestedArray[r3]);
              h.test(e3.name) && (e3.parent[e3.name] = e3);
            }
          }, p.prototype._handleRemove = function(e3) {
            if (e3 instanceof s) {
              if (void 0 !== e3.extend)
                if (e3.extensionField)
                  e3.extensionField.parent.remove(e3.extensionField), e3.extensionField = null;
                else {
                  var t3 = this.deferred.indexOf(e3);
                  t3 > -1 && this.deferred.splice(t3, 1);
                }
            } else if (e3 instanceof c)
              h.test(e3.name) && delete e3.parent[e3.name];
            else if (e3 instanceof o2) {
              for (var r3 = 0; r3 < e3.nestedArray.length; ++r3)
                this._handleRemove(e3._nestedArray[r3]);
              h.test(e3.name) && delete e3.parent[e3.name];
            }
          }, p._configure = function() {
            n = r2(192), i = r2(845), a = r2(72), s = r2(286), c = r2(582), u = r2(735), l = r2(935);
          };
        }, 889: function(e2) {
          e2.exports = {};
        }, 325: function(e2, t2, r2) {
          "use strict";
          e2.exports = n;
          var o2 = r2(935);
          function n(e3, t3, r3) {
            if ("function" != typeof e3)
              throw TypeError("rpcImpl must be a function");
            o2.EventEmitter.call(this), this.rpcImpl = e3, this.requestDelimited = Boolean(t3), this.responseDelimited = Boolean(r3);
          }
          (n.prototype = Object.create(o2.EventEmitter.prototype)).constructor = n, n.prototype.rpcCall = function e3(t3, r3, n2, i, a) {
            if (!i)
              throw TypeError("request must be specified");
            var s = this;
            if (!a)
              return o2.asPromise(e3, s, t3, r3, n2, i);
            if (s.rpcImpl)
              try {
                return s.rpcImpl(t3, r3[s.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function(e4, r4) {
                  if (e4)
                    return s.emit("error", e4, t3), a(e4);
                  if (null !== r4) {
                    if (!(r4 instanceof n2))
                      try {
                        r4 = n2[s.responseDelimited ? "decodeDelimited" : "decode"](r4);
                      } catch (e5) {
                        return s.emit("error", e5, t3), a(e5);
                      }
                    return s.emit("data", r4, t3), a(null, r4);
                  }
                  s.end(true);
                });
              } catch (e4) {
                return s.emit("error", e4, t3), void setTimeout(function() {
                  a(e4);
                }, 0);
              }
            else
              setTimeout(function() {
                a(Error("already ended"));
              }, 0);
          }, n.prototype.end = function(e3) {
            return this.rpcImpl && (e3 || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
          };
        }, 447: function(e2, t2, r2) {
          "use strict";
          e2.exports = s;
          var o2, n, i, a = r2(476);
          function s(e3, t3) {
            a.call(this, e3, t3), this.methods = {}, this._methodsArray = null;
          }
          function c(e3) {
            return e3._methodsArray = null, e3;
          }
          ((s.prototype = Object.create(a.prototype)).constructor = s).className = "Service", s.fromJSON = function(e3, t3) {
            var r3 = new s(e3, t3.options);
            if (t3.methods)
              for (var n2 = Object.keys(t3.methods), i2 = 0; i2 < n2.length; ++i2)
                r3.add(o2.fromJSON(n2[i2], t3.methods[n2[i2]]));
            return t3.nested && r3.addJSON(t3.nested), r3.comment = t3.comment, r3;
          }, s.prototype.toJSON = function(e3) {
            var t3 = a.prototype.toJSON.call(this, e3), r3 = !!e3 && Boolean(e3.keepComments);
            return n.toObject(["options", t3 && t3.options || void 0, "methods", a.arrayToJSON(this.methodsArray, e3) || {}, "nested", t3 && t3.nested || void 0, "comment", r3 ? this.comment : void 0]);
          }, Object.defineProperty(s.prototype, "methodsArray", { get: function() {
            return this._methodsArray || (this._methodsArray = n.toArray(this.methods));
          } }), s.prototype.get = function(e3) {
            return this.methods[e3] || a.prototype.get.call(this, e3);
          }, s.prototype.resolveAll = function() {
            for (var e3 = this.methodsArray, t3 = 0; t3 < e3.length; ++t3)
              e3[t3].resolve();
            return a.prototype.resolve.call(this);
          }, s.prototype.add = function(e3) {
            if (this.get(e3.name))
              throw Error("duplicate name '" + e3.name + "' in " + this);
            return e3 instanceof o2 ? (this.methods[e3.name] = e3, e3.parent = this, c(this)) : a.prototype.add.call(this, e3);
          }, s.prototype.remove = function(e3) {
            if (e3 instanceof o2) {
              if (this.methods[e3.name] !== e3)
                throw Error(e3 + " is not a member of " + this);
              return delete this.methods[e3.name], e3.parent = null, c(this);
            }
            return a.prototype.remove.call(this, e3);
          }, s.prototype.create = function(e3, t3, r3) {
            for (var o3, a2 = new i.Service(e3, t3, r3), s2 = 0; s2 < this.methodsArray.length; ++s2) {
              var c2 = n.lcFirst((o3 = this._methodsArray[s2]).resolve().name).replace(/[^$\w_]/g, "");
              a2[c2] = n.codegen(["r", "c"], n.isReserved(c2) ? c2 + "_" : c2)("return this.rpcCall(m,q,s,r,c)")({ m: o3, q: o3.resolvedRequestType.ctor, s: o3.resolvedResponseType.ctor });
            }
            return a2;
          }, s._configure = function() {
            o2 = r2(484), n = r2(935), i = r2(325);
          };
        }, 869: function(e2) {
          e2.exports = p;
          var t2 = /[\s{}=;:[\],'"()<>]/g, r2 = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, o2 = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g, n = /^ *[*/]+ */, i = /^\s*\*?\/*/, a = /\n/g, s = /\s/, c = /\\(.?)/g, u = { 0: "\0", r: "\r", n: "\n", t: "	" };
          function l(e3) {
            return e3.replace(c, function(e4, t3) {
              switch (t3) {
                case "\\":
                case "":
                  return t3;
                default:
                  return u[t3] || "";
              }
            });
          }
          function p(e3, c2) {
            e3 = e3.toString();
            var u2 = 0, p2 = e3.length, d = 1, h = null, f = null, m = 0, g = false, E = [], y = null;
            function T(e4) {
              return Error("illegal " + e4 + " (line " + d + ")");
            }
            function _(t3) {
              return e3.charAt(t3);
            }
            function v(t3, r3) {
              h = e3.charAt(t3++), m = d, g = false;
              var o3, s2 = t3 - (c2 ? 2 : 3);
              do {
                if (--s2 < 0 || "\n" === (o3 = e3.charAt(s2))) {
                  g = true;
                  break;
                }
              } while (" " === o3 || "	" === o3);
              for (var u3 = e3.substring(t3, r3).split(a), l2 = 0; l2 < u3.length; ++l2)
                u3[l2] = u3[l2].replace(c2 ? i : n, "").trim();
              f = u3.join("\n").trim();
            }
            function O(t3) {
              var r3 = R(t3), o3 = e3.substring(t3, r3);
              return /^\s*\/{1,2}/.test(o3);
            }
            function R(e4) {
              for (var t3 = e4; t3 < p2 && "\n" !== _(t3); )
                t3++;
              return t3;
            }
            function I() {
              if (E.length > 0)
                return E.shift();
              if (y)
                return function() {
                  var t3 = "'" === y ? o2 : r2;
                  t3.lastIndex = u2 - 1;
                  var n3 = t3.exec(e3);
                  if (!n3)
                    throw T("string");
                  return u2 = t3.lastIndex, S(y), y = null, l(n3[1]);
                }();
              var n2, i2, a2, h2, f2;
              do {
                if (u2 === p2)
                  return null;
                for (n2 = false; s.test(a2 = _(u2)); )
                  if ("\n" === a2 && ++d, ++u2 === p2)
                    return null;
                if ("/" === _(u2)) {
                  if (++u2 === p2)
                    throw T("comment");
                  if ("/" === _(u2))
                    if (c2) {
                      if (h2 = u2, f2 = false, O(u2)) {
                        f2 = true;
                        do {
                          if ((u2 = R(u2)) === p2)
                            break;
                          u2++;
                        } while (O(u2));
                      } else
                        u2 = Math.min(p2, R(u2) + 1);
                      f2 && v(h2, u2), d++, n2 = true;
                    } else {
                      for (f2 = "/" === _(h2 = u2 + 1); "\n" !== _(++u2); )
                        if (u2 === p2)
                          return null;
                      ++u2, f2 && v(h2, u2 - 1), ++d, n2 = true;
                    }
                  else {
                    if ("*" !== (a2 = _(u2)))
                      return "/";
                    h2 = u2 + 1, f2 = c2 || "*" === _(h2);
                    do {
                      if ("\n" === a2 && ++d, ++u2 === p2)
                        throw T("comment");
                      i2 = a2, a2 = _(u2);
                    } while ("*" !== i2 || "/" !== a2);
                    ++u2, f2 && v(h2, u2 - 2), n2 = true;
                  }
                }
              } while (n2);
              var m2 = u2;
              if (t2.lastIndex = 0, !t2.test(_(m2++)))
                for (; m2 < p2 && !t2.test(_(m2)); )
                  ++m2;
              var g2 = e3.substring(u2, u2 = m2);
              return '"' !== g2 && "'" !== g2 || (y = g2), g2;
            }
            function S(e4) {
              E.push(e4);
            }
            function C() {
              if (!E.length) {
                var e4 = I();
                if (null === e4)
                  return null;
                S(e4);
              }
              return E[0];
            }
            return Object.defineProperty({ next: I, peek: C, push: S, skip: function(e4, t3) {
              var r3 = C();
              if (r3 === e4)
                return I(), true;
              if (!t3)
                throw T("token '" + r3 + "', '" + e4 + "' expected");
              return false;
            }, cmnt: function(e4) {
              var t3 = null;
              return void 0 === e4 ? m === d - 1 && (c2 || "*" === h || g) && (t3 = f) : (m < e4 && C(), m !== e4 || g || !c2 && "/" !== h || (t3 = f)), t3;
            } }, "line", { get: function() {
              return d;
            } });
          }
          p.unescape = l;
        }, 192: function(e2, t2, r2) {
          e2.exports = y;
          var o2, n, i, a, s, c, u, l, p, d, h, f, m, g, E = r2(476);
          function y(e3, t3) {
            E.call(this, e3, t3), this.fields = {}, this.oneofs = void 0, this.extensions = void 0, this.reserved = void 0, this.group = void 0, this._fieldsById = null, this._fieldsArray = null, this._oneofsArray = null, this._ctor = null;
          }
          function T(e3) {
            return e3._fieldsById = e3._fieldsArray = e3._oneofsArray = null, delete e3.encode, delete e3.decode, delete e3.verify, e3;
          }
          ((y.prototype = Object.create(E.prototype)).constructor = y).className = "Type", Object.defineProperties(y.prototype, { fieldsById: { get: function() {
            if (this._fieldsById)
              return this._fieldsById;
            this._fieldsById = {};
            for (var e3 = Object.keys(this.fields), t3 = 0; t3 < e3.length; ++t3) {
              var r3 = this.fields[e3[t3]], o3 = r3.id;
              if (this._fieldsById[o3])
                throw Error("duplicate id " + o3 + " in " + this);
              this._fieldsById[o3] = r3;
            }
            return this._fieldsById;
          } }, fieldsArray: { get: function() {
            return this._fieldsArray || (this._fieldsArray = u.toArray(this.fields));
          } }, oneofsArray: { get: function() {
            return this._oneofsArray || (this._oneofsArray = u.toArray(this.oneofs));
          } }, ctor: { get: function() {
            return this._ctor || (this.ctor = y.generateConstructor(this));
          }, set: function(e3) {
            var t3 = e3.prototype;
            t3 instanceof i || ((e3.prototype = new i()).constructor = e3, u.merge(e3.prototype, t3)), e3.$type = e3.prototype.$type = this, u.merge(e3, i, true), u.merge(e3.prototype, i, true), this._ctor = e3;
            for (var r3 = 0; r3 < this.fieldsArray.length; ++r3)
              this._fieldsArray[r3].resolve();
            var o3 = {};
            for (r3 = 0; r3 < this.oneofsArray.length; ++r3) {
              var n2 = this._oneofsArray[r3].resolve().name, a2 = function(e4) {
                for (var t4 = {}, r4 = 0; r4 < e4.length; ++r4)
                  t4[e4[r4]] = 0;
                return { setter: function(r5) {
                  if (!(e4.indexOf(r5) < 0)) {
                    t4[r5] = 1;
                    for (var o4 = 0; o4 < e4.length; ++o4)
                      e4[o4] !== r5 && delete this[e4[o4]];
                  }
                }, getter: function() {
                  for (var e5 = Object.keys(this), r5 = e5.length - 1; r5 > -1; --r5)
                    if (1 === t4[e5[r5]] && void 0 !== this[e5[r5]] && null !== this[e5[r5]])
                      return e5[r5];
                } };
              }(this._oneofsArray[r3].oneof);
              o3[n2] = { get: a2.getter, set: a2.setter };
            }
            r3 && Object.defineProperties(e3.prototype, o3);
          } } }), y.generateConstructor = function(e3) {
            return function(t3) {
              for (var r3, o3 = 0; o3 < e3.fieldsArray.length; o3++)
                (r3 = e3._fieldsArray[o3]).map ? this[r3.name] = {} : r3.repeated && (this[r3.name] = []);
              if (t3)
                for (var n2 = Object.keys(t3), i2 = 0; i2 < n2.length; ++i2)
                  null != t3[n2[i2]] && (this[n2[i2]] = t3[n2[i2]]);
            };
          }, y.fromJSON = function(e3, t3) {
            var r3 = new y(e3, t3.options);
            r3.extensions = t3.extensions, r3.reserved = t3.reserved;
            for (var i2 = Object.keys(t3.fields), s2 = 0; s2 < i2.length; ++s2)
              r3.add((void 0 !== t3.fields[i2[s2]].keyType ? g.fromJSON : n.fromJSON)(i2[s2], t3.fields[i2[s2]]));
            if (t3.oneofs)
              for (i2 = Object.keys(t3.oneofs), s2 = 0; s2 < i2.length; ++s2)
                r3.add(a.fromJSON(i2[s2], t3.oneofs[i2[s2]]));
            if (t3.nested)
              for (i2 = Object.keys(t3.nested), s2 = 0; s2 < i2.length; ++s2) {
                var c2 = t3.nested[i2[s2]];
                r3.add((void 0 !== c2.id ? n.fromJSON : void 0 !== c2.fields ? y.fromJSON : void 0 !== c2.values ? o2.fromJSON : void 0 !== c2.methods ? h.fromJSON : E.fromJSON)(i2[s2], c2));
              }
            return t3.extensions && t3.extensions.length && (r3.extensions = t3.extensions), t3.reserved && t3.reserved.length && (r3.reserved = t3.reserved), t3.group && (r3.group = true), t3.comment && (r3.comment = t3.comment), r3;
          }, y.prototype.toJSON = function(e3) {
            var t3 = E.prototype.toJSON.call(this, e3), r3 = !!e3 && Boolean(e3.keepComments);
            return { options: t3 && t3.options || void 0, oneofs: E.arrayToJSON(this.oneofsArray, e3), fields: E.arrayToJSON(this.fieldsArray.filter(function(e4) {
              return !e4.declaringField;
            }), e3) || {}, extensions: this.extensions && this.extensions.length ? this.extensions : void 0, reserved: this.reserved && this.reserved.length ? this.reserved : void 0, group: this.group || void 0, nested: t3 && t3.nested || void 0, comment: r3 ? this.comment : void 0 };
          }, y.prototype.resolveAll = function() {
            for (var e3 = this.fieldsArray, t3 = 0; t3 < e3.length; )
              e3[t3++].resolve();
            var r3 = this.oneofsArray;
            for (t3 = 0; t3 < r3.length; )
              r3[t3++].resolve();
            return E.prototype.resolveAll.call(this);
          }, y.prototype.get = function(e3) {
            return this.fields[e3] || this.oneofs && this.oneofs[e3] || this.nested && this.nested[e3] || null;
          }, y.prototype.add = function(e3) {
            if (this.get(e3.name))
              throw Error("duplicate name '" + e3.name + "' in " + this);
            if (e3 instanceof n && void 0 === e3.extend) {
              if (this._fieldsById && this._fieldsById[e3.id])
                throw Error("duplicate id " + e3.id + " in " + this);
              if (this.isReservedId(e3.id))
                throw Error("id " + e3.id + " is reserved in " + this);
              if (this.isReservedName(e3.name))
                throw Error("name '" + e3.name + "' is reserved in " + this);
              return e3.parent && e3.parent.remove(e3), this.fields[e3.name] = e3, e3.message = this, e3.onAdd(this), T(this);
            }
            return e3 instanceof a ? (this.oneofs || (this.oneofs = {}), this.oneofs[e3.name] = e3, e3.onAdd(this), T(this)) : E.prototype.add.call(this, e3);
          }, y.prototype.remove = function(e3) {
            if (e3 instanceof n && void 0 === e3.extend) {
              if (!this.fields || this.fields[e3.name] !== e3)
                throw Error(e3 + " is not a member of " + this);
              return delete this.fields[e3.name], e3.parent = null, e3.onRemove(this), T(this);
            }
            if (e3 instanceof a) {
              if (!this.oneofs || this.oneofs[e3.name] !== e3)
                throw Error(e3 + " is not a member of " + this);
              return delete this.oneofs[e3.name], e3.parent = null, e3.onRemove(this), T(this);
            }
            return E.prototype.remove.call(this, e3);
          }, y.prototype.isReservedId = function(e3) {
            return E.isReservedId(this.reserved, e3);
          }, y.prototype.isReservedName = function(e3) {
            return E.isReservedName(this.reserved, e3);
          }, y.prototype.create = function(e3) {
            return new this.ctor(e3);
          }, y.prototype.setup = function() {
            for (var e3 = this.fullName, t3 = [], r3 = 0; r3 < this.fieldsArray.length; ++r3)
              t3.push(this._fieldsArray[r3].resolve().resolvedType);
            this.encode = p(this)({ Writer: s, types: t3, util: u }), this.decode = d(this)({ Reader: c, types: t3, util: u }), this.verify = l(this)({ types: t3, util: u }), this.fromObject = m.fromObject(this)({ types: t3, util: u }), this.toObject = m.toObject(this)({ types: t3, util: u });
            var o3 = f[e3];
            if (o3) {
              var n2 = Object.create(this);
              n2.fromObject = this.fromObject, this.fromObject = o3.fromObject.bind(n2), n2.toObject = this.toObject, this.toObject = o3.toObject.bind(n2);
            }
            return this;
          }, y.prototype.encode = function(e3, t3) {
            return this.setup().encode(e3, t3);
          }, y.prototype.encodeDelimited = function(e3, t3) {
            return this.encode(e3, t3 && t3.len ? t3.fork() : t3).ldelim();
          }, y.prototype.decode = function(e3, t3) {
            return this.setup().decode(e3, t3);
          }, y.prototype.decodeDelimited = function(e3) {
            return e3 instanceof c || (e3 = c.create(e3)), this.decode(e3, e3.uint32());
          }, y.prototype.verify = function(e3) {
            return this.setup().verify(e3);
          }, y.prototype.fromObject = function(e3) {
            return this.setup().fromObject(e3);
          }, y.prototype.toObject = function(e3, t3) {
            return this.setup().toObject(e3, t3);
          }, y.d = function(e3) {
            return function(t3) {
              u.decorateType(t3, e3);
            };
          }, y._configure = function() {
            o2 = r2(582), n = r2(286), i = r2(339), a = r2(735), s = r2(244), c = r2(494), u = r2(935), l = r2(216), p = r2(929), d = r2(888), h = r2(447), f = r2(834), m = r2(525), g = r2(435);
          };
        }, 696: function(e2, t2, r2) {
          "use strict";
          var o2 = e2.exports, n = r2(935), i = ["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "bool", "string", "bytes"];
          function a(e3, t3) {
            var r3 = 0, o3 = {};
            for (t3 |= 0; r3 < e3.length; )
              o3[i[r3 + t3]] = e3[r3++];
            return o3;
          }
          o2.basic = a([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2, 2]), o2.defaults = a([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, "", n.emptyArray, null]), o2.long = a([0, 0, 0, 1, 1], 7), o2.mapKey = a([0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0, 2], 2), o2.packed = a([1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 1, 1, 0]), o2._configure = function() {
            n = r2(935);
          };
        }, 498: function(e2) {
          "use strict";
          var t2 = e2.exports;
          t2.length = function(e3) {
            for (var t3 = 0, r2 = 0, o2 = 0; o2 < e3.length; ++o2)
              (r2 = e3.charCodeAt(o2)) < 128 ? t3 += 1 : r2 < 2048 ? t3 += 2 : 55296 == (64512 & r2) && 56320 == (64512 & e3.charCodeAt(o2 + 1)) ? (++o2, t3 += 4) : t3 += 3;
            return t3;
          }, t2.read = function(e3, t3, r2) {
            if (r2 - t3 < 1)
              return "";
            for (var o2, n = null, i = [], a = 0; t3 < r2; )
              (o2 = e3[t3++]) < 128 ? i[a++] = o2 : o2 > 191 && o2 < 224 ? i[a++] = (31 & o2) << 6 | 63 & e3[t3++] : o2 > 239 && o2 < 365 ? (o2 = ((7 & o2) << 18 | (63 & e3[t3++]) << 12 | (63 & e3[t3++]) << 6 | 63 & e3[t3++]) - 65536, i[a++] = 55296 + (o2 >> 10), i[a++] = 56320 + (1023 & o2)) : i[a++] = (15 & o2) << 12 | (63 & e3[t3++]) << 6 | 63 & e3[t3++], a > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, i)), a = 0);
            return n ? (a && n.push(String.fromCharCode.apply(String, i.slice(0, a))), n.join("")) : String.fromCharCode.apply(String, i.slice(0, a));
          }, t2.write = function(e3, t3, r2) {
            for (var o2, n, i = r2, a = 0; a < e3.length; ++a)
              (o2 = e3.charCodeAt(a)) < 128 ? t3[r2++] = o2 : o2 < 2048 ? (t3[r2++] = o2 >> 6 | 192, t3[r2++] = 63 & o2 | 128) : 55296 == (64512 & o2) && 56320 == (64512 & (n = e3.charCodeAt(a + 1))) ? (o2 = 65536 + ((1023 & o2) << 10) + (1023 & n), ++a, t3[r2++] = o2 >> 18 | 240, t3[r2++] = o2 >> 12 & 63 | 128, t3[r2++] = o2 >> 6 & 63 | 128, t3[r2++] = 63 & o2 | 128) : (t3[r2++] = o2 >> 12 | 224, t3[r2++] = o2 >> 6 & 63 | 128, t3[r2++] = 63 & o2 | 128);
            return r2 - i;
          };
        }, 935: function(e2, t2, r2) {
          var o2 = e2.exports, n = r2(889);
          o2.LongBits = r2(365), o2.Long = r2(939), o2.pool = r2(997), o2.float = r2(283), o2.asPromise = r2(728), o2.EventEmitter = r2(969), o2.path = r2(444), o2.base64 = r2(440), o2.utf8 = r2(498), o2.compareFieldsById = function(e3, t3) {
            return e3.id - t3.id;
          }, o2.toArray = function(e3) {
            if (e3) {
              for (var t3 = Object.keys(e3), r3 = new Array(t3.length), o3 = 0; o3 < t3.length; )
                r3[o3] = e3[t3[o3++]];
              return r3;
            }
            return [];
          }, o2.toObject = function(e3) {
            for (var t3 = {}, r3 = 0; r3 < e3.length; ) {
              var o3 = e3[r3++], n2 = e3[r3++];
              void 0 !== n2 && (t3[o3] = n2);
            }
            return t3;
          }, o2.isString = function(e3) {
            return "string" == typeof e3 || e3 instanceof String;
          }, o2.isReserved = function(e3) {
            return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(e3);
          }, o2.isObject = function(e3) {
            return e3 && "object" == typeof e3;
          }, o2.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, o2.oneOfGetter = function(e3) {
            for (var t3 = {}, r3 = 0; r3 < e3.length; ++r3)
              t3[e3[r3]] = 1;
            return function() {
              for (var e4 = Object.keys(this), r4 = e4.length - 1; r4 > -1; --r4)
                if (1 === t3[e4[r4]] && void 0 !== this[e4[r4]] && null !== this[e4[r4]])
                  return e4[r4];
            };
          }, o2.oneOfSetter = function(e3) {
            return function(t3) {
              for (var r3 = 0; r3 < e3.length; ++r3)
                e3[r3] !== t3 && delete this[e3[r3]];
            };
          }, o2.merge = function(e3, t3, r3) {
            for (var o3 = Object.keys(t3), n2 = 0; n2 < o3.length; ++n2)
              void 0 !== e3[o3[n2]] && r3 || (e3[o3[n2]] = t3[o3[n2]]);
            return e3;
          }, o2.decorateType = function(e3, t3) {
            if (e3.$type)
              return t3 && e3.$type.name !== t3 && (o2.decorateRoot.remove(e3.$type), e3.$type.name = t3, o2.decorateRoot.add(e3.$type)), e3.$type;
            Type || (Type = r2(192));
            var n2 = new Type(t3 || e3.name);
            return o2.decorateRoot.add(n2), n2.ctor = e3, Object.defineProperty(e3, "$type", { value: n2, enumerable: false }), Object.defineProperty(e3.prototype, "$type", { value: n2, enumerable: false }), n2;
          }, o2.emptyArray = Object.freeze ? Object.freeze([]) : [], o2.emptyObject = Object.freeze ? Object.freeze({}) : {}, o2.longToHash = function(e3) {
            return e3 ? o2.LongBits.from(e3).toHash() : o2.LongBits.zeroHash;
          }, o2.copy = function(e3) {
            if ("object" != typeof e3)
              return e3;
            var t3 = {};
            for (var r3 in e3)
              t3[r3] = e3[r3];
            return t3;
          }, o2.deepCopy = function e3(t3) {
            if ("object" != typeof t3)
              return t3;
            var r3 = {};
            for (var o3 in t3)
              r3[o3] = e3(t3[o3]);
            return r3;
          }, o2.ProtocolError = function(e3) {
            function t3(e4, r3) {
              if (!(this instanceof t3))
                return new t3(e4, r3);
              Object.defineProperty(this, "message", { get: function() {
                return e4;
              } }), Error.captureStackTrace ? Error.captureStackTrace(this, t3) : Object.defineProperty(this, "stack", { value: new Error().stack || "" }), r3 && merge(this, r3);
            }
            return (t3.prototype = Object.create(Error.prototype)).constructor = t3, Object.defineProperty(t3.prototype, "name", { get: function() {
              return e3;
            } }), t3.prototype.toString = function() {
              return this.name + ": " + this.message;
            }, t3;
          }, o2.toJSONOptions = { longs: String, enums: String, bytes: String, json: true }, o2.Buffer = null, o2.newBuffer = function(e3) {
            return "number" == typeof e3 ? new o2.Array(e3) : "undefined" == typeof Uint8Array ? e3 : new Uint8Array(e3);
          }, o2.stringToBytes = function(e3) {
            var t3, r3, o3 = [];
            t3 = e3.length;
            for (var n2 = 0; n2 < t3; n2++)
              (r3 = e3.charCodeAt(n2)) >= 65536 && r3 <= 1114111 ? (o3.push(r3 >> 18 & 7 | 240), o3.push(r3 >> 12 & 63 | 128), o3.push(r3 >> 6 & 63 | 128), o3.push(63 & r3 | 128)) : r3 >= 2048 && r3 <= 65535 ? (o3.push(r3 >> 12 & 15 | 224), o3.push(r3 >> 6 & 63 | 128), o3.push(63 & r3 | 128)) : r3 >= 128 && r3 <= 2047 ? (o3.push(r3 >> 6 & 31 | 192), o3.push(63 & r3 | 128)) : o3.push(255 & r3);
            return o3;
          }, o2.byteToString = function(e3) {
            if ("string" == typeof e3)
              return e3;
            for (var t3 = "", r3 = e3, o3 = 0; o3 < r3.length; o3++) {
              var n2 = r3[o3].toString(2), i = n2.match(/^1+?(?=0)/);
              if (i && 8 == n2.length) {
                for (var a = i[0].length, s = r3[o3].toString(2).slice(7 - a), c = 1; c < a; c++)
                  s += r3[c + o3].toString(2).slice(2);
                t3 += String.fromCharCode(parseInt(s, 2)), o3 += a - 1;
              } else
                t3 += String.fromCharCode(r3[o3]);
            }
            return t3;
          }, o2.isInteger = Number.isInteger || function(e3) {
            return "number" == typeof e3 && isFinite(e3) && Math.floor(e3) === e3;
          }, Object.defineProperty(o2, "decorateRoot", { get: function() {
            return n.decorated || (n.decorated = new (r2(685))());
          } });
        }, 216: function(e2, t2, r2) {
          var o2, n;
          function i(e3, t3) {
            return e3.name + ": " + t3 + (e3.repeated && "array" !== t3 ? "[]" : e3.map && "object" !== t3 ? "{k:" + e3.keyType + "}" : "") + " expected";
          }
          function a(e3, t3, r3, a2) {
            var s2 = a2.types;
            if (e3.resolvedType)
              if (e3.resolvedType instanceof o2) {
                if (Object.keys(e3.resolvedType.values).indexOf(r3) < 0)
                  return i(e3, "enum value");
              } else {
                var c2 = s2[t3].verify(r3);
                if (c2)
                  return e3.name + "." + c2;
              }
            else
              switch (e3.type) {
                case "int32":
                case "uint32":
                case "sint32":
                case "fixed32":
                case "sfixed32":
                  if (!n.isInteger(r3))
                    return i(e3, "integer");
                  break;
                case "int64":
                case "uint64":
                case "sint64":
                case "fixed64":
                case "sfixed64":
                  if (!(n.isInteger(r3) || r3 && n.isInteger(r3.low) && n.isInteger(r3.high)))
                    return i(e3, "integer|Long");
                  break;
                case "float":
                case "double":
                  if ("number" != typeof r3)
                    return i(e3, "number");
                  break;
                case "bool":
                  if ("boolean" != typeof r3)
                    return i(e3, "boolean");
                  break;
                case "string":
                  if (!n.isString(r3))
                    return i(e3, "string");
                  break;
                case "bytes":
                  if (!(r3 && "number" == typeof r3.length || n.isString(r3)))
                    return i(e3, "buffer");
              }
          }
          function s(e3, t3) {
            switch (e3.keyType) {
              case "int32":
              case "uint32":
              case "sint32":
              case "fixed32":
              case "sfixed32":
                if (!n.key32Re.test(t3))
                  return i(e3, "integer key");
                break;
              case "int64":
              case "uint64":
              case "sint64":
              case "fixed64":
              case "sfixed64":
                if (!n.key64Re.test(t3))
                  return i(e3, "integer|Long key");
                break;
              case "bool":
                if (!n.key2Re.test(t3))
                  return i(e3, "boolean key");
            }
          }
          function c(e3) {
            return function(t3) {
              return function(r3) {
                var o3;
                if ("object" != typeof r3 || null === r3)
                  return "object expected";
                var c2, u = {};
                e3.oneofsArray.length && (c2 = {});
                for (var l = 0; l < e3.fieldsArray.length; ++l) {
                  var p, d = e3._fieldsArray[l].resolve(), h = r3[d.name];
                  if (!d.optional || null != h && r3.hasOwnProperty(d.name))
                    if (d.map) {
                      if (!n.isObject(h))
                        return i(d, "object");
                      var f = Object.keys(h);
                      for (p = 0; p < f.length; ++p) {
                        if (o3 = s(d, f[p]))
                          return o3;
                        if (o3 = a(d, l, h[f[p]], t3))
                          return o3;
                      }
                    } else if (d.repeated) {
                      if (!Array.isArray(h))
                        return i(d, "array");
                      for (p = 0; p < h.length; ++p)
                        if (o3 = a(d, l, h[p], t3))
                          return o3;
                    } else {
                      if (d.partOf) {
                        var m = d.partOf.name;
                        if (1 === u[d.partOf.name] && 1 === c2[m])
                          return d.partOf.name + ": multiple values";
                        c2[m] = 1;
                      }
                      if (o3 = a(d, l, h, t3))
                        return o3;
                    }
                }
              };
            };
          }
          e2.exports = c, c._configure = function() {
            o2 = r2(582), n = r2(935);
          };
        }, 834: function(e2, t2, r2) {
          var o2, n = t2;
          n[".google.protobuf.Any"] = { fromObject: function(e3) {
            if (e3 && e3["@type"]) {
              var t3 = this.lookup(e3["@type"]);
              if (t3) {
                var r3 = "." === e3["@type"].charAt(0) ? e3["@type"].substr(1) : e3["@type"];
                return this.create({ type_url: "/" + r3, value: t3.encode(t3.fromObject(e3)).finish() });
              }
            }
            return this.fromObject(e3);
          }, toObject: function(e3, t3) {
            if (t3 && t3.json && e3.type_url && e3.value) {
              var r3 = e3.type_url.substring(e3.type_url.lastIndexOf("/") + 1), n2 = this.lookup(r3);
              n2 && (e3 = n2.decode(e3.value));
            }
            if (!(e3 instanceof this.ctor) && e3 instanceof o2) {
              var i = e3.$type.toObject(e3, t3);
              return i["@type"] = e3.$type.fullName, i;
            }
            return this.toObject(e3, t3);
          } }, n._configure = function() {
            o2 = r2(339);
          };
        }, 244: function(e2, t2, r2) {
          e2.exports = u;
          var o2, n = r2(935), i = r2(498);
          function a(e3, t3, r3) {
            this.fn = e3, this.len = t3, this.next = void 0, this.val = r3;
          }
          function s() {
          }
          function c(e3) {
            this.head = e3.head, this.tail = e3.tail, this.len = e3.len, this.next = e3.states;
          }
          function u() {
            this.len = 0, this.head = new a(s, 0, 0), this.tail = this.head, this.states = null;
          }
          function l(e3, t3, r3) {
            t3[r3] = 255 & e3;
          }
          function p(e3, t3) {
            this.len = e3, this.next = void 0, this.val = t3;
          }
          function d(e3, t3, r3) {
            for (; e3.hi; )
              t3[r3++] = 127 & e3.lo | 128, e3.lo = (e3.lo >>> 7 | e3.hi << 25) >>> 0, e3.hi >>>= 7;
            for (; e3.lo > 127; )
              t3[r3++] = 127 & e3.lo | 128, e3.lo = e3.lo >>> 7;
            t3[r3++] = e3.lo;
          }
          function h(e3, t3, r3) {
            t3[r3] = 255 & e3, t3[r3 + 1] = e3 >>> 8 & 255, t3[r3 + 2] = e3 >>> 16 & 255, t3[r3 + 3] = e3 >>> 24;
          }
          u.create = n.Buffer ? function() {
            return (u.create = function() {
              return new (void 0)();
            })();
          } : function() {
            return new u();
          }, u.alloc = function(e3) {
            return new n.Array(e3);
          }, n.Array !== Array && (u.alloc = n.pool(u.alloc, n.Array.prototype.subarray)), u.prototype._push = function(e3, t3, r3) {
            return this.tail = this.tail.next = new a(e3, t3, r3), this.len += t3, this;
          }, p.prototype = Object.create(a.prototype), p.prototype.fn = function(e3, t3, r3) {
            for (; e3 > 127; )
              t3[r3++] = 127 & e3 | 128, e3 >>>= 7;
            t3[r3] = e3;
          }, u.prototype.uint32 = function(e3) {
            return this.len += (this.tail = this.tail.next = new p((e3 >>>= 0) < 128 ? 1 : e3 < 16384 ? 2 : e3 < 2097152 ? 3 : e3 < 268435456 ? 4 : 5, e3)).len, this;
          }, u.prototype.int32 = function(e3) {
            return e3 < 0 ? this._push(d, 10, o2.fromNumber(e3)) : this.uint32(e3);
          }, u.prototype.sint32 = function(e3) {
            return this.uint32((e3 << 1 ^ e3 >> 31) >>> 0);
          }, u.prototype.uint64 = function(e3) {
            var t3 = o2.from(e3);
            return this._push(d, t3.length(), t3);
          }, u.prototype.int64 = u.prototype.uint64, u.prototype.sint64 = function(e3) {
            var t3 = o2.from(e3).zzEncode();
            return this._push(d, t3.length(), t3);
          }, u.prototype.bool = function(e3) {
            return this._push(l, 1, e3 ? 1 : 0);
          }, u.prototype.fixed32 = function(e3) {
            return this._push(h, 4, e3 >>> 0);
          }, u.prototype.sfixed32 = u.prototype.fixed32, u.prototype.fixed64 = function(e3) {
            var t3 = o2.from(e3);
            return this._push(h, 4, t3.lo)._push(h, 4, t3.hi);
          }, u.prototype.sfixed64 = u.prototype.fixed64, u.prototype.float = function(e3) {
            return this._push(n.float.writeFloatLE, 4, e3);
          }, u.prototype.double = function(e3) {
            return this._push(n.float.writeDoubleLE, 8, e3);
          };
          var f = n.Array.prototype.set ? function(e3, t3, r3) {
            t3.set(e3, r3);
          } : function(e3, t3, r3) {
            for (var o3 = 0; o3 < e3.length; ++o3)
              t3[r3 + o3] = e3[o3];
          };
          u.prototype.bytes = function(e3) {
            var t3 = e3.length >>> 0;
            if (!t3)
              return this._push(l, 1, 0);
            if (n.isString(e3)) {
              var r3 = u.alloc(t3 = i.length(e3));
              i.write(e3, r3, 0), e3 = r3;
            }
            return this.uint32(t3)._push(f, t3, e3);
          }, u.prototype.string = function(e3) {
            var t3 = i.length(e3);
            return t3 ? this.uint32(t3)._push(i.write, t3, e3) : this._push(l, 1, 0);
          }, u.prototype.fork = function() {
            return this.states = new c(this), this.head = this.tail = new a(s, 0, 0), this.len = 0, this;
          }, u.prototype.reset = function() {
            return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new a(s, 0, 0), this.len = 0), this;
          }, u.prototype.ldelim = function() {
            var e3 = this.head, t3 = this.tail, r3 = this.len;
            return this.reset().uint32(r3), r3 && (this.tail.next = e3.next, this.tail = t3, this.len += r3), this;
          }, u.prototype.finish = function() {
            for (var e3 = this.head.next, t3 = this.constructor.alloc(this.len), r3 = 0; e3; )
              e3.fn(e3.val, t3, r3), r3 += e3.len, e3 = e3.next;
            return t3;
          }, u._configure = function() {
            o2 = r2(365), r2(440), i = r2(498);
          };
        } }, t = {};
        function r(o2) {
          var n = t[o2];
          if (void 0 !== n)
            return n.exports;
          var i = t[o2] = { exports: {} };
          return e[o2](i, i.exports, r), i.exports;
        }
        r.amdO = {}, r.n = function(e2) {
          var t2 = e2 && e2.__esModule ? function() {
            return e2.default;
          } : function() {
            return e2;
          };
          return r.d(t2, { a: t2 }), t2;
        }, r.d = function(e2, t2) {
          for (var o2 in t2)
            r.o(t2, o2) && !r.o(e2, o2) && Object.defineProperty(e2, o2, { enumerable: true, get: t2[o2] });
        }, r.g = function() {
          if ("object" == typeof globalThis)
            return globalThis;
          try {
            return this || new Function("return this")();
          } catch (e2) {
            if ("object" == typeof window)
              return window;
          }
        }(), r.o = function(e2, t2) {
          return Object.prototype.hasOwnProperty.call(e2, t2);
        }, r.r = function(e2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var o = {};
        return function() {
          "use strict";
          r.r(o), r.d(o, { default: function() {
            return Qi;
          } });
          var e2 = {};
          r.r(e2), r.d(e2, { acceptContactInvite: function() {
            return ar;
          }, acceptInvitation: function() {
            return ir;
          }, addContact: function() {
            return rr;
          }, addReaction: function() {
            return gr;
          }, addToBlackList: function() {
            return ur;
          }, addUsersToBlacklist: function() {
            return lr;
          }, addUsersToBlocklist: function() {
            return pr;
          }, declineContactInvite: function() {
            return cr;
          }, declineInvitation: function() {
            return sr;
          }, deleteContact: function() {
            return nr;
          }, deleteConversation: function() {
            return zt;
          }, deleteReaction: function() {
            return Er;
          }, deleteSession: function() {
            return Vt;
          }, fetchHistoryMessages: function() {
            return Zt;
          }, fetchUserInfoById: function() {
            return Yt;
          }, getBlacklist: function() {
            return xt;
          }, getBlocklist: function() {
            return Bt;
          }, getChatToken: function() {
            return $t;
          }, getContacts: function() {
            return jt;
          }, getConversationlist: function() {
            return Kt;
          }, getHistoryMessages: function() {
            return tr;
          }, getReactionDetail: function() {
            return _r;
          }, getReactionList: function() {
            return yr;
          }, getReactionlist: function() {
            return Tr;
          }, getRoster: function() {
            return Ht;
          }, getSessionList: function() {
            return qt;
          }, recallMessage: function() {
            return mr;
          }, removeFromBlackList: function() {
            return dr;
          }, removeHistoryMessages: function() {
            return Or;
          }, removeRoster: function() {
            return or;
          }, removeUserFromBlackList: function() {
            return hr;
          }, removeUserFromBlocklist: function() {
            return fr;
          }, reportMessage: function() {
            return vr;
          }, updateCurrentUserNick: function() {
            return Qt;
          }, updateOwnUserInfo: function() {
            return Jt;
          }, updateUserInfo: function() {
            return Xt;
          }, uploadPushToken: function() {
            return Wt;
          }, uploadToken: function() {
            return Ft;
          } });
          var t2 = {};
          r.r(t2), r.d(t2, { acceptGroupInvite: function() {
            return eo;
          }, acceptGroupJoinRequest: function() {
            return Yr;
          }, addUsersToGroupAllowlist: function() {
            return Mo;
          }, addUsersToGroupWhitelist: function() {
            return Ao;
          }, agreeInviteIntoGroup: function() {
            return Zr;
          }, agreeJoinGroup: function() {
            return Xr;
          }, blockGroup: function() {
            return Sr;
          }, blockGroupMember: function() {
            return go;
          }, blockGroupMembers: function() {
            return yo;
          }, blockGroupMessages: function() {
            return Cr;
          }, changeGroupOwner: function() {
            return wr;
          }, changeOwner: function() {
            return Ur;
          }, createGroup: function() {
            return Ir;
          }, createGroupNew: function() {
            return Rr;
          }, deleteGroupSharedFile: function() {
            return Wo;
          }, destroyGroup: function() {
            return Wr;
          }, disableSendGroupMsg: function() {
            return Co;
          }, dissolveGroup: function() {
            return Fr;
          }, downloadGroupSharedFile: function() {
            return Vo;
          }, enableSendGroupMsg: function() {
            return No;
          }, fetchGroupAnnouncement: function() {
            return Ho;
          }, fetchGroupSharedFileList: function() {
            return qo;
          }, getGroup: function() {
            return Mr;
          }, getGroupAdmin: function() {
            return Gr;
          }, getGroupAllowlist: function() {
            return Po;
          }, getGroupBlacklist: function() {
            return Io;
          }, getGroupBlacklistNew: function() {
            return Ro;
          }, getGroupBlocklist: function() {
            return So;
          }, getGroupInfo: function() {
            return kr;
          }, getGroupMemberAttributes: function() {
            return Jo;
          }, getGroupMembersAttributes: function() {
            return Xo;
          }, getGroupMsgReadUser: function() {
            return Bo;
          }, getGroupMuteList: function() {
            return ho;
          }, getGroupMutelist: function() {
            return fo;
          }, getGroupSharedFilelist: function() {
            return Ko;
          }, getGroupWhitelist: function() {
            return ko;
          }, getJoinedGroups: function() {
            return br;
          }, getMuted: function() {
            return po;
          }, getPublicGroups: function() {
            return Ar;
          }, groupBlockMulti: function() {
            return Eo;
          }, groupBlockSingle: function() {
            return mo;
          }, inviteToGroup: function() {
            return Vr;
          }, inviteUsersToGroup: function() {
            return zr;
          }, isGroupWhiteUser: function() {
            return Lo;
          }, isInGroupAllowlist: function() {
            return Go;
          }, isInGroupMutelist: function() {
            return xo;
          }, isInGroupWhiteList: function() {
            return Do;
          }, joinGroup: function() {
            return Jr;
          }, leaveGroup: function() {
            return Kr;
          }, listGroupMember: function() {
            return Lr;
          }, listGroupMembers: function() {
            return Dr;
          }, listGroups: function() {
            return Nr;
          }, modifyGroup: function() {
            return Pr;
          }, mute: function() {
            return so;
          }, muteGroupMember: function() {
            return co;
          }, quitGroup: function() {
            return qr;
          }, rejectGroupInvite: function() {
            return ro;
          }, rejectGroupJoinRequest: function() {
            return $r;
          }, rejectInviteIntoGroup: function() {
            return to;
          }, rejectJoinGroup: function() {
            return Qr;
          }, removeAdmin: function() {
            return Hr;
          }, removeGroupAdmin: function() {
            return jr;
          }, removeGroupAllowlistMember: function() {
            return wo;
          }, removeGroupBlockMulti: function() {
            return vo;
          }, removeGroupBlockSingle: function() {
            return To;
          }, removeGroupMember: function() {
            return no;
          }, removeGroupMembers: function() {
            return ao;
          }, removeGroupWhitelistMember: function() {
            return Uo;
          }, removeMultiGroupMember: function() {
            return io;
          }, removeMute: function() {
            return uo;
          }, removeSingleGroupMember: function() {
            return oo;
          }, rmUsersFromGroupWhitelist: function() {
            return bo;
          }, setAdmin: function() {
            return xr;
          }, setGroupAdmin: function() {
            return Br;
          }, setGroupMemberAttributes: function() {
            return zo;
          }, unblockGroupMember: function() {
            return _o;
          }, unblockGroupMembers: function() {
            return Oo;
          }, unmuteGroupMember: function() {
            return lo;
          }, updateGroupAnnouncement: function() {
            return jo;
          }, uploadGroupSharedFile: function() {
            return Fo;
          } });
          var n = {};
          r.r(n), r.d(n, { addUsersToChatRoom: function() {
            return an;
          }, addUsersToChatRoomAllowlist: function() {
            return Ln;
          }, addUsersToChatRoomWhitelist: function() {
            return Pn;
          }, blockChatRoomMember: function() {
            return On;
          }, blockChatRoomMembers: function() {
            return In;
          }, chatRoomBlockMulti: function() {
            return Rn;
          }, chatRoomBlockSingle: function() {
            return vn;
          }, createChatRoom: function() {
            return Qo;
          }, deleteChatRoomSharedFile: function() {
            return zn;
          }, destroyChatRoom: function() {
            return $o;
          }, disableSendChatRoomMsg: function() {
            return wn;
          }, enableSendChatRoomMsg: function() {
            return kn;
          }, fetchChatRoomAnnouncement: function() {
            return qn;
          }, fetchChatRoomSharedFileList: function() {
            return Jn;
          }, getChatRoomAdmin: function() {
            return dn;
          }, getChatRoomAllowlist: function() {
            return Hn;
          }, getChatRoomAttributes: function() {
            return Yn;
          }, getChatRoomBlacklist: function() {
            return bn;
          }, getChatRoomBlacklistNew: function() {
            return Mn;
          }, getChatRoomBlocklist: function() {
            return Un;
          }, getChatRoomDetails: function() {
            return Zo;
          }, getChatRoomMuteList: function() {
            return Tn;
          }, getChatRoomMuted: function() {
            return yn;
          }, getChatRoomMutelist: function() {
            return _n;
          }, getChatRoomSharedFilelist: function() {
            return Xn;
          }, getChatRoomWhitelist: function() {
            return Bn;
          }, getChatRooms: function() {
            return Yo;
          }, isChatRoomWhiteUser: function() {
            return jn;
          }, isInChatRoomAllowlist: function() {
            return Fn;
          }, isInChatRoomMutelist: function() {
            return Wn;
          }, joinChatRoom: function() {
            return sn;
          }, leaveChatRoom: function() {
            return un;
          }, listChatRoomMember: function() {
            return ln;
          }, listChatRoomMembers: function() {
            return pn;
          }, modifyChatRoom: function() {
            return en;
          }, muteChatRoomMember: function() {
            return mn;
          }, quitChatRoom: function() {
            return cn;
          }, removeChatRoomAdmin: function() {
            return fn;
          }, removeChatRoomAllowlistMember: function() {
            return xn;
          }, removeChatRoomAttribute: function() {
            return ei;
          }, removeChatRoomAttributes: function() {
            return Zn;
          }, removeChatRoomBlockMulti: function() {
            return Nn;
          }, removeChatRoomBlockSingle: function() {
            return Sn;
          }, removeChatRoomMember: function() {
            return rn;
          }, removeChatRoomMembers: function() {
            return nn;
          }, removeChatRoomWhitelistMember: function() {
            return Gn;
          }, removeMultiChatRoomMember: function() {
            return on;
          }, removeMuteChatRoomMember: function() {
            return gn;
          }, removeSingleChatRoomMember: function() {
            return tn;
          }, rmUsersFromChatRoomWhitelist: function() {
            return Dn;
          }, setChatRoomAdmin: function() {
            return hn;
          }, setChatRoomAttribute: function() {
            return $n;
          }, setChatRoomAttributes: function() {
            return Qn;
          }, unblockChatRoomMember: function() {
            return Cn;
          }, unblockChatRoomMembers: function() {
            return An;
          }, unmuteChatRoomMember: function() {
            return En;
          }, updateChatRoomAnnouncement: function() {
            return Kn;
          }, uploadChatRoomSharedFile: function() {
            return Vn;
          } });
          var i = {};
          r.r(i), r.d(i, { getPresenceStatus: function() {
            return ci;
          }, getSubscribedPresenceList: function() {
            return ai;
          }, getSubscribedPresencelist: function() {
            return si;
          }, publishPresence: function() {
            return oi;
          }, subscribePresence: function() {
            return ni;
          }, unsubscribePresence: function() {
            return ii;
          } });
          var a = {};
          r.r(a), r.d(a, { clearRemindTypeForConversation: function() {
            return di;
          }, getPushPerformLanguage: function() {
            return gi;
          }, getSilentModeForAll: function() {
            return li;
          }, getSilentModeForConversation: function() {
            return hi;
          }, getSilentModeForConversations: function() {
            return fi;
          }, setPushPerformLanguage: function() {
            return mi;
          }, setSilentModeForAll: function() {
            return ui;
          }, setSilentModeForConversation: function() {
            return pi;
          } });
          var s = {};
          r.r(s), r.d(s, { changeChatThreadName: function() {
            return Ri;
          }, createChatThread: function() {
            return Ti;
          }, destroyChatThread: function() {
            return Oi;
          }, getChatThreadDetail: function() {
            return Mi;
          }, getChatThreadLastMessage: function() {
            return Ai;
          }, getChatThreadMembers: function() {
            return Ii;
          }, getChatThreads: function() {
            return Ni;
          }, getJoinedChatThreads: function() {
            return Ci;
          }, joinChatThread: function() {
            return _i;
          }, leaveChatThread: function() {
            return vi;
          }, removeChatThreadMember: function() {
            return Si;
          } });
          var c = {};
          r.r(c), r.d(c, { getSupportedLanguages: function() {
            return bi;
          }, translateMessage: function() {
            return Ui;
          } });
          var u = {};
          function l() {
            u.converter._configure(), u.decoder._configure(), u.encoder._configure(), u.Field._configure(), u.MapField._configure(), u.Message._configure(), u.Namespace._configure(), u.Method._configure(), u.ReflectionObject._configure(), u.OneOf._configure(), u.parse._configure(), u.Reader._configure(), u.Root._configure(), u.Service._configure(), u.verifier._configure(), u.Type._configure(), u.types._configure(), u.wrappers._configure(), u.Writer._configure();
          }
          u.build = "minimal", u.Writer = r(244), u.encoder = r(929), u.Reader = r(494), u.util = r(935), u.rpc = r(325), u.roots = r(889), u.verifier = r(216), u.tokenize = r(869), u.parse = r(845), u.common = r(72), u.ReflectionObject = r(998), u.Namespace = r(476), u.Root = r(685), u.Enum = r(582), u.Type = r(192), u.Field = r(286), u.OneOf = r(735), u.MapField = r(435), u.Service = r(447), u.Method = r(484), u.converter = r(525), u.decoder = r(888), u.Message = r(339), u.wrappers = r(834), u.types = r(696), u.util = r(935), u.configure = l, u.load = function(e3, t3, r2) {
            return "function" == typeof t3 ? (r2 = t3, t3 = new u.Root()) : t3 || (t3 = new u.Root()), t3.load(e3, r2);
          }, u.loadSync = function(e3, t3) {
            return t3 || (t3 = new u.Root()), t3.loadSync(e3);
          }, u.parseFromPbString = function(e3, t3, r2) {
            return "function" == typeof t3 ? (r2 = t3, t3 = new u.Root()) : t3 || (t3 = new u.Root()), t3.parseFromPbString(e3, r2);
          }, l();
          var p, d = u, h = r(168), f = r.n(h), m = function() {
            function e3(e4) {
              this.type = e4.type, this.message = e4.message, this.data = e4.data;
            }
            return e3.create = function(t3) {
              return new e3(t3);
            }, e3;
          }();
          !function(e3) {
            e3[e3.REQUEST_SUCCESS = 0] = "REQUEST_SUCCESS", e3[e3.REQUEST_TIMEOUT = -1] = "REQUEST_TIMEOUT", e3[e3.REQUEST_UNKNOWN = -2] = "REQUEST_UNKNOWN", e3[e3.REQUEST_PARAMETER_ERROR = -3] = "REQUEST_PARAMETER_ERROR", e3[e3.REQUEST_ABORT = -4] = "REQUEST_ABORT", e3[e3.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR = 0] = "WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR", e3[e3.WEBIM_CONNCTION_OPEN_ERROR = 1] = "WEBIM_CONNCTION_OPEN_ERROR", e3[e3.WEBIM_CONNCTION_AUTH_ERROR = 2] = "WEBIM_CONNCTION_AUTH_ERROR", e3[e3.WEBIM_CONNCTION_OPEN_USERGRID_ERROR = 3] = "WEBIM_CONNCTION_OPEN_USERGRID_ERROR", e3[e3.WEBIM_CONNCTION_ATTACH_ERROR = 4] = "WEBIM_CONNCTION_ATTACH_ERROR", e3[e3.WEBIM_CONNCTION_ATTACH_USERGRID_ERROR = 5] = "WEBIM_CONNCTION_ATTACH_USERGRID_ERROR", e3[e3.WEBIM_CONNCTION_REOPEN_ERROR = 6] = "WEBIM_CONNCTION_REOPEN_ERROR", e3[e3.WEBIM_CONNCTION_SERVER_CLOSE_ERROR = 7] = "WEBIM_CONNCTION_SERVER_CLOSE_ERROR", e3[e3.WEBIM_CONNCTION_SERVER_ERROR = 8] = "WEBIM_CONNCTION_SERVER_ERROR", e3[e3.WEBIM_CONNCTION_IQ_ERROR = 9] = "WEBIM_CONNCTION_IQ_ERROR", e3[e3.WEBIM_CONNCTION_PING_ERROR = 10] = "WEBIM_CONNCTION_PING_ERROR", e3[e3.WEBIM_CONNCTION_NOTIFYVERSION_ERROR = 11] = "WEBIM_CONNCTION_NOTIFYVERSION_ERROR", e3[e3.WEBIM_CONNCTION_GETROSTER_ERROR = 12] = "WEBIM_CONNCTION_GETROSTER_ERROR", e3[e3.WEBIM_CONNCTION_CROSSDOMAIN_ERROR = 13] = "WEBIM_CONNCTION_CROSSDOMAIN_ERROR", e3[e3.WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES = 14] = "WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES", e3[e3.WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR = 15] = "WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR", e3[e3.WEBIM_CONNCTION_DISCONNECTED = 16] = "WEBIM_CONNCTION_DISCONNECTED", e3[e3.WEBIM_CONNCTION_AJAX_ERROR = 17] = "WEBIM_CONNCTION_AJAX_ERROR", e3[e3.WEBIM_CONNCTION_JOINROOM_ERROR = 18] = "WEBIM_CONNCTION_JOINROOM_ERROR", e3[e3.WEBIM_CONNCTION_GETROOM_ERROR = 19] = "WEBIM_CONNCTION_GETROOM_ERROR", e3[e3.WEBIM_CONNCTION_GETROOMINFO_ERROR = 20] = "WEBIM_CONNCTION_GETROOMINFO_ERROR", e3[e3.WEBIM_CONNCTION_GETROOMMEMBER_ERROR = 21] = "WEBIM_CONNCTION_GETROOMMEMBER_ERROR", e3[e3.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR = 22] = "WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR", e3[e3.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR = 23] = "WEBIM_CONNCTION_LOAD_CHATROOM_ERROR", e3[e3.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR = 24] = "WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR", e3[e3.WEBIM_CONNCTION_JOINCHATROOM_ERROR = 25] = "WEBIM_CONNCTION_JOINCHATROOM_ERROR", e3[e3.WEBIM_CONNCTION_QUITCHATROOM_ERROR = 26] = "WEBIM_CONNCTION_QUITCHATROOM_ERROR", e3[e3.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR = 27] = "WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR", e3[e3.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR = 28] = "WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR", e3[e3.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR = 29] = "WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR", e3[e3.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR = 30] = "WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR", e3[e3.WEBIM_CONNCTION_CALLBACK_INNER_ERROR = 31] = "WEBIM_CONNCTION_CALLBACK_INNER_ERROR", e3[e3.WEBIM_CONNCTION_CLIENT_OFFLINE = 32] = "WEBIM_CONNCTION_CLIENT_OFFLINE", e3[e3.WEBIM_CONNCTION_CLIENT_LOGOUT = 33] = "WEBIM_CONNCTION_CLIENT_LOGOUT", e3[e3.WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR = 34] = "WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR", e3[e3.WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP = 35] = "WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP", e3[e3.WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP = 36] = "WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP", e3[e3.WEBIM_CONNECTION_ACCEPT_JOIN_GROUP = 37] = "WEBIM_CONNECTION_ACCEPT_JOIN_GROUP", e3[e3.WEBIM_CONNECTION_DECLINE_JOIN_GROUP = 38] = "WEBIM_CONNECTION_DECLINE_JOIN_GROUP", e3[e3.WEBIM_CONNECTION_CLOSED = 39] = "WEBIM_CONNECTION_CLOSED", e3[e3.WEBIM_CONNECTION_ERROR = 40] = "WEBIM_CONNECTION_ERROR", e3[e3.MAX_LIMIT = 50] = "MAX_LIMIT", e3[e3.MESSAGE_NOT_FOUND = 51] = "MESSAGE_NOT_FOUND", e3[e3.NO_PERMISSION = 52] = "NO_PERMISSION", e3[e3.OPERATION_UNSUPPORTED = 53] = "OPERATION_UNSUPPORTED", e3[e3.OPERATION_NOT_ALLOWED = 54] = "OPERATION_NOT_ALLOWED", e3[e3.WEBIM_UPLOADFILE_BROWSER_ERROR = 100] = "WEBIM_UPLOADFILE_BROWSER_ERROR", e3[e3.WEBIM_UPLOADFILE_ERROR = 101] = "WEBIM_UPLOADFILE_ERROR", e3[e3.WEBIM_UPLOADFILE_NO_LOGIN = 102] = "WEBIM_UPLOADFILE_NO_LOGIN", e3[e3.WEBIM_UPLOADFILE_NO_FILE = 103] = "WEBIM_UPLOADFILE_NO_FILE", e3[e3.WEBIM_DOWNLOADFILE_ERROR = 200] = "WEBIM_DOWNLOADFILE_ERROR", e3[e3.WEBIM_DOWNLOADFILE_NO_LOGIN = 201] = "WEBIM_DOWNLOADFILE_NO_LOGIN", e3[e3.WEBIM_DOWNLOADFILE_BROWSER_ERROR = 202] = "WEBIM_DOWNLOADFILE_BROWSER_ERROR", e3[e3.USER_NOT_FOUND = 204] = "USER_NOT_FOUND", e3[e3.MESSAGE_PARAMETER_ERROR = 205] = "MESSAGE_PARAMETER_ERROR", e3[e3.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE = 206] = "WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE", e3[e3.WEBIM_CONNCTION_USER_REMOVED = 207] = "WEBIM_CONNCTION_USER_REMOVED", e3[e3.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD = 216] = "WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD", e3[e3.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE = 217] = "WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE", e3[e3.USER_MUTED_BY_ADMIN = 219] = "USER_MUTED_BY_ADMIN", e3[e3.USER_NOT_FRIEND = 221] = "USER_NOT_FRIEND", e3[e3.WEBIM_MESSAGE_REC_TEXT = 300] = "WEBIM_MESSAGE_REC_TEXT", e3[e3.WEBIM_MESSAGE_REC_TEXT_ERROR = 301] = "WEBIM_MESSAGE_REC_TEXT_ERROR", e3[e3.WEBIM_MESSAGE_REC_EMOTION = 302] = "WEBIM_MESSAGE_REC_EMOTION", e3[e3.WEBIM_MESSAGE_REC_PHOTO = 303] = "WEBIM_MESSAGE_REC_PHOTO", e3[e3.WEBIM_MESSAGE_REC_AUDIO = 304] = "WEBIM_MESSAGE_REC_AUDIO", e3[e3.WEBIM_MESSAGE_REC_AUDIO_FILE = 305] = "WEBIM_MESSAGE_REC_AUDIO_FILE", e3[e3.WEBIM_MESSAGE_REC_VEDIO = 306] = "WEBIM_MESSAGE_REC_VEDIO", e3[e3.WEBIM_MESSAGE_REC_VEDIO_FILE = 307] = "WEBIM_MESSAGE_REC_VEDIO_FILE", e3[e3.WEBIM_MESSAGE_REC_FILE = 308] = "WEBIM_MESSAGE_REC_FILE", e3[e3.WEBIM_MESSAGE_SED_TEXT = 309] = "WEBIM_MESSAGE_SED_TEXT", e3[e3.WEBIM_MESSAGE_SED_EMOTION = 310] = "WEBIM_MESSAGE_SED_EMOTION", e3[e3.WEBIM_MESSAGE_SED_PHOTO = 311] = "WEBIM_MESSAGE_SED_PHOTO", e3[e3.WEBIM_MESSAGE_SED_AUDIO = 312] = "WEBIM_MESSAGE_SED_AUDIO", e3[e3.WEBIM_MESSAGE_SED_AUDIO_FILE = 313] = "WEBIM_MESSAGE_SED_AUDIO_FILE", e3[e3.WEBIM_MESSAGE_SED_VEDIO = 314] = "WEBIM_MESSAGE_SED_VEDIO", e3[e3.WEBIM_MESSAGE_SED_VEDIO_FILE = 315] = "WEBIM_MESSAGE_SED_VEDIO_FILE", e3[e3.WEBIM_MESSAGE_SED_FILE = 316] = "WEBIM_MESSAGE_SED_FILE", e3[e3.WEBIM_MESSAGE_SED_ERROR = 317] = "WEBIM_MESSAGE_SED_ERROR", e3[e3.STATUS_INIT = 400] = "STATUS_INIT", e3[e3.STATUS_DOLOGIN_USERGRID = 401] = "STATUS_DOLOGIN_USERGRID", e3[e3.STATUS_DOLOGIN_IM = 402] = "STATUS_DOLOGIN_IM", e3[e3.STATUS_OPENED = 403] = "STATUS_OPENED", e3[e3.STATUS_CLOSING = 404] = "STATUS_CLOSING", e3[e3.STATUS_CLOSED = 405] = "STATUS_CLOSED", e3[e3.STATUS_ERROR = 406] = "STATUS_ERROR", e3[e3.SERVER_BUSY = 500] = "SERVER_BUSY", e3[e3.MESSAGE_INCLUDE_ILLEGAL_CONTENT = 501] = "MESSAGE_INCLUDE_ILLEGAL_CONTENT", e3[e3.MESSAGE_EXTERNAL_LOGIC_BLOCKED = 502] = "MESSAGE_EXTERNAL_LOGIC_BLOCKED", e3[e3.SERVER_UNKNOWN_ERROR = 503] = "SERVER_UNKNOWN_ERROR", e3[e3.MESSAGE_RECALL_TIME_LIMIT = 504] = "MESSAGE_RECALL_TIME_LIMIT", e3[e3.SERVICE_NOT_ENABLED = 505] = "SERVICE_NOT_ENABLED", e3[e3.SERVICE_NOT_ALLOW_MESSAGING = 506] = "SERVICE_NOT_ALLOW_MESSAGING", e3[e3.SERVICE_NOT_ALLOW_MESSAGING_MUTE = 507] = "SERVICE_NOT_ALLOW_MESSAGING_MUTE", e3[e3.MESSAGE_MODERATION_BLOCKED = 508] = "MESSAGE_MODERATION_BLOCKED", e3[e3.MESSAGE_CURRENT_LIMITING = 509] = "MESSAGE_CURRENT_LIMITING", e3[e3.MESSAGE_WEBSOCKET_DISCONNECTED = 510] = "MESSAGE_WEBSOCKET_DISCONNECTED", e3[e3.GROUP_NOT_EXIST = 605] = "GROUP_NOT_EXIST", e3[e3.GROUP_NOT_JOINED = 602] = "GROUP_NOT_JOINED", e3[e3.GROUP_MEMBERS_FULL = 606] = "GROUP_MEMBERS_FULL", e3[e3.PERMISSION_DENIED = 603] = "PERMISSION_DENIED", e3[e3.WEBIM_LOAD_MSG_ERROR = 604] = "WEBIM_LOAD_MSG_ERROR", e3[e3.GROUP_ALREADY_JOINED = 601] = "GROUP_ALREADY_JOINED", e3[e3.GROUP_MEMBERS_LIMIT = 607] = "GROUP_MEMBERS_LIMIT", e3[e3.GROUP_IS_DISABLED = 608] = "GROUP_IS_DISABLED", e3[e3.GROUP_MEMBER_ATTRIBUTES_SET_FAILED = 609] = "GROUP_MEMBER_ATTRIBUTES_SET_FAILED", e3[e3.REST_PARAMS_STATUS = 700] = "REST_PARAMS_STATUS", e3[e3.CHATROOM_NOT_JOINED = 702] = "CHATROOM_NOT_JOINED", e3[e3.CHATROOM_MEMBERS_FULL = 704] = "CHATROOM_MEMBERS_FULL", e3[e3.CHATROOM_NOT_EXIST = 705] = "CHATROOM_NOT_EXIST", e3[e3.SDK_RUNTIME_ERROR = 999] = "SDK_RUNTIME_ERROR", e3[e3.PRESENCE_PARAM_EXCEED = 1100] = "PRESENCE_PARAM_EXCEED", e3[e3.REACTION_ALREADY_ADDED = 1101] = "REACTION_ALREADY_ADDED", e3[e3.REACTION_CREATING = 1102] = "REACTION_CREATING", e3[e3.REACTION_OPERATION_IS_ILLEGAL = 1103] = "REACTION_OPERATION_IS_ILLEGAL", e3[e3.TRANSLATION_NOT_VALID = 1200] = "TRANSLATION_NOT_VALID", e3[e3.TRANSLATION_TEXT_TOO_LONG = 1201] = "TRANSLATION_TEXT_TOO_LONG", e3[e3.TRANSLATION_FAILED = 1204] = "TRANSLATION_FAILED", e3[e3.THREAD_NOT_EXIST = 1300] = "THREAD_NOT_EXIST", e3[e3.THREAD_ALREADY_EXIST = 1301] = "THREAD_ALREADY_EXIST";
          }(p || (p = {}));
          var g, E, y, T, _, v, O = function() {
            return O = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, O.apply(this, arguments);
          };
          !function(e3) {
            e3[e3.UNKNOWOPERATION = -1] = "UNKNOWOPERATION", e3[e3.REST_GET_SESSION_LIST = 1] = "REST_GET_SESSION_LIST", e3[e3.REST_DEL_SESSION = 2] = "REST_DEL_SESSION", e3[e3.REST_GET_HISTORY_MESSAGE = 3] = "REST_GET_HISTORY_MESSAGE", e3[e3.REST_OPERATE = 10] = "REST_OPERATE", e3[e3.MSYNC_SENDMESSAGE = 11] = "MSYNC_SENDMESSAGE", e3[e3.MSYNC_RECALLMESSAGE = 12] = "MSYNC_RECALLMESSAGE", e3[e3.MSYNC_OPERATE = 20] = "MSYNC_OPERATE", e3[e3.ROSTER_ADD = 21] = "ROSTER_ADD", e3[e3.ROSTER_REMOVE = 22] = "ROSTER_REMOVE", e3[e3.ROSTER_ACCEPT = 23] = "ROSTER_ACCEPT", e3[e3.ROSTER_DECLINE = 24] = "ROSTER_DECLINE", e3[e3.ROSTER_BAN = 25] = "ROSTER_BAN", e3[e3.ROSTER_ALLOW = 26] = "ROSTER_ALLOW", e3[e3.ROSTER_BLACKLIST = 27] = "ROSTER_BLACKLIST", e3[e3.ROSTER_CONTACTS = 28] = "ROSTER_CONTACTS", e3[e3.ROSTER_OPERATE = 30] = "ROSTER_OPERATE", e3[e3.USER_LOGIN = 31] = "USER_LOGIN", e3[e3.USER_CREATE = 32] = "USER_CREATE", e3[e3.USER_UPDATE_USERINFO = 33] = "USER_UPDATE_USERINFO", e3[e3.USER_FETCH_USERINFO = 34] = "USER_FETCH_USERINFO", e3[e3.USER_UPDATE_NICK = 35] = "USER_UPDATE_NICK", e3[e3.USER_UPLOAD_PUSH_TOKEN = 36] = "USER_UPLOAD_PUSH_TOKEN", e3[e3.USER_OPERATE = 40] = "USER_OPERATE", e3[e3.GROUP_CREATEGROUP = 41] = "GROUP_CREATEGROUP", e3[e3.GROUP_BLOCK_MESSAGE = 42] = "GROUP_BLOCK_MESSAGE", e3[e3.GROUP_FETCH_PUBLICGROUPS_WITHCURSOR = 43] = "GROUP_FETCH_PUBLICGROUPS_WITHCURSOR", e3[e3.GROUP_FETCH_USERS_GROUP = 44] = "GROUP_FETCH_USERS_GROUP", e3[e3.GROUP_CHANGE_OWNER = 45] = "GROUP_CHANGE_OWNER", e3[e3.GROUP_FETCH_SPECIFICATION = 46] = "GROUP_FETCH_SPECIFICATION", e3[e3.GROUP_CHANGE_GROUPATTRIBUTE = 47] = "GROUP_CHANGE_GROUPATTRIBUTE", e3[e3.GROUP_FETCH_MEMEBERS = 48] = "GROUP_FETCH_MEMEBERS", e3[e3.GROUP_GET_ADMIN = 49] = "GROUP_GET_ADMIN", e3[e3.GROUP_SET_ADMIN = 50] = "GROUP_SET_ADMIN", e3[e3.GROUP_REMOVE_ADMIN = 51] = "GROUP_REMOVE_ADMIN", e3[e3.GROUP_DESTOTYGROUP = 52] = "GROUP_DESTOTYGROUP", e3[e3.GROUP_LEAVEGROUP = 53] = "GROUP_LEAVEGROUP", e3[e3.GROUP_INVITE_TO_GROUP = 54] = "GROUP_INVITE_TO_GROUP", e3[e3.GROUP_JOIN_PUBLICGROUP = 55] = "GROUP_JOIN_PUBLICGROUP", e3[e3.GROUP_ACCEPT_JOINPUBLICGROUPAPPL = 56] = "GROUP_ACCEPT_JOINPUBLICGROUPAPPL", e3[e3.GROUP_DECLINE_JOINPUBLICGROUPAPPL = 57] = "GROUP_DECLINE_JOINPUBLICGROUPAPPL", e3[e3.GROUP_ACCEPT_INVITATION = 58] = "GROUP_ACCEPT_INVITATION", e3[e3.GROUP_DECLINE_INVITATION = 59] = "GROUP_DECLINE_INVITATION", e3[e3.GROUP_REMOVE_MEMBER = 60] = "GROUP_REMOVE_MEMBER", e3[e3.GROUP_REMOVE_MEMBERS = 61] = "GROUP_REMOVE_MEMBERS", e3[e3.GROUP_MUTE_MEMBERS = 62] = "GROUP_MUTE_MEMBERS", e3[e3.GROUP_UNMUTE_MEMBERS = 63] = "GROUP_UNMUTE_MEMBERS", e3[e3.GROUP_FETCH_MUTES = 64] = "GROUP_FETCH_MUTES", e3[e3.GROUP_BLOCK_MEMBER = 65] = "GROUP_BLOCK_MEMBER", e3[e3.GROUP_BLOCK_MEMBERS = 66] = "GROUP_BLOCK_MEMBERS", e3[e3.GROUP_UNBLOCK_MEMBER = 67] = "GROUP_UNBLOCK_MEMBER", e3[e3.GROUP_UNBLOCK_MEMBERS = 68] = "GROUP_UNBLOCK_MEMBERS", e3[e3.GROUP_GET_BLOCK_LIST = 69] = "GROUP_GET_BLOCK_LIST", e3[e3.GROUP_MUTE_ALLMEMBERS = 70] = "GROUP_MUTE_ALLMEMBERS", e3[e3.GROUP_UNMUTE_ALLMEMBERS = 71] = "GROUP_UNMUTE_ALLMEMBERS", e3[e3.GROUP_ADD_WHITELIST = 72] = "GROUP_ADD_WHITELIST", e3[e3.GROUP_REMOVE_WHITELIST = 73] = "GROUP_REMOVE_WHITELIST", e3[e3.GROUP_FETCH_WHITELIST = 74] = "GROUP_FETCH_WHITELIST", e3[e3.GROUP_IS_IN_WHITELIST = 75] = "GROUP_IS_IN_WHITELIST", e3[e3.GROUP_GET_READ_USERS = 76] = "GROUP_GET_READ_USERS", e3[e3.GROUP_FETCH_ANNOUNCEMENT = 77] = "GROUP_FETCH_ANNOUNCEMENT", e3[e3.GROUP_UPDATE_ANNOUNCEMENT = 78] = "GROUP_UPDATE_ANNOUNCEMENT", e3[e3.GROUP_UPLOAD_SHAREDFILE = 79] = "GROUP_UPLOAD_SHAREDFILE", e3[e3.GROUP_DELETE_SHAREDFILE = 80] = "GROUP_DELETE_SHAREDFILE", e3[e3.GROUP_FETCH_SHAREDFILE = 81] = "GROUP_FETCH_SHAREDFILE", e3[e3.GROUP_DOWNLOAD_SHAREDFILE = 82] = "GROUP_DOWNLOAD_SHAREDFILE", e3[e3.GROUP_MEMBER_SET_META_DATA = 83] = "GROUP_MEMBER_SET_META_DATA", e3[e3.GROUP_MEMBER_FETCH_META_DATA = 84] = "GROUP_MEMBER_FETCH_META_DATA", e3[e3.GROUP_OPERATE = 100] = "GROUP_OPERATE", e3[e3.CHATROOM_FETCH_CHATROOMSWITHPAGE = 101] = "CHATROOM_FETCH_CHATROOMSWITHPAGE", e3[e3.CHATROOM_CREATECHATROOM = 102] = "CHATROOM_CREATECHATROOM", e3[e3.CHATROOM_DESTORYCHATROOM = 103] = "CHATROOM_DESTORYCHATROOM", e3[e3.CHATROOM_FETCH_SPECIFICATION = 104] = "CHATROOM_FETCH_SPECIFICATION", e3[e3.CHATROOM_CHANGE_ATTRIBUTE = 105] = "CHATROOM_CHANGE_ATTRIBUTE", e3[e3.CHATROOM_REMOVE_MEMBER = 106] = "CHATROOM_REMOVE_MEMBER", e3[e3.CHATROOM_REMOVE_MEMBERS = 107] = "CHATROOM_REMOVE_MEMBERS", e3[e3.CHATROOM_ADD_MEMBERS = 108] = "CHATROOM_ADD_MEMBERS", e3[e3.CHATROOM_JOINCAHTROOM = 109] = "CHATROOM_JOINCAHTROOM", e3[e3.CHATROOM_LEAVECAHTROOM = 110] = "CHATROOM_LEAVECAHTROOM", e3[e3.CHATROOM_FETCH_MEMBERS = 111] = "CHATROOM_FETCH_MEMBERS", e3[e3.CHATROOM_GET_ADMIN = 112] = "CHATROOM_GET_ADMIN", e3[e3.CHATROOM_SET_ADMIN = 113] = "CHATROOM_SET_ADMIN", e3[e3.CHATROOM_REMOVE_ADMIN = 114] = "CHATROOM_REMOVE_ADMIN", e3[e3.CHATROOM_MUTE_USER = 115] = "CHATROOM_MUTE_USER", e3[e3.CHATROOM_UNMUTE_USER = 116] = "CHATROOM_UNMUTE_USER", e3[e3.CHATROOM_FETCH_MUTES = 117] = "CHATROOM_FETCH_MUTES", e3[e3.CHATROOM_BLOCK_USER = 118] = "CHATROOM_BLOCK_USER", e3[e3.CHATROOM_BLOCK_USERS = 119] = "CHATROOM_BLOCK_USERS", e3[e3.CHATROOM_UNBLOCK_USER = 120] = "CHATROOM_UNBLOCK_USER", e3[e3.CHATROOM_UNBLOCK_USERS = 121] = "CHATROOM_UNBLOCK_USERS", e3[e3.CHATROOM_FETCH_BANS = 122] = "CHATROOM_FETCH_BANS", e3[e3.CHATROOM_MUTE_ALLMEMEBERS = 123] = "CHATROOM_MUTE_ALLMEMEBERS", e3[e3.CHATROOM_UNMUTE_ALLMEMEBERS = 124] = "CHATROOM_UNMUTE_ALLMEMEBERS", e3[e3.CHATROOM_ADD_WHITELIST = 125] = "CHATROOM_ADD_WHITELIST", e3[e3.CHATROOM_REMOVE_WHITELIST = 126] = "CHATROOM_REMOVE_WHITELIST", e3[e3.CHATROOM_FETCH_WHITELIST = 127] = "CHATROOM_FETCH_WHITELIST", e3[e3.CHATROOM_FETCH_MEMBERIN_WHITELIST = 128] = "CHATROOM_FETCH_MEMBERIN_WHITELIST", e3[e3.CHATROOM_FETCH_ANNOUNCEMENT = 129] = "CHATROOM_FETCH_ANNOUNCEMENT", e3[e3.CHATROOM_UPDATE_ANNOUNCEMENT = 130] = "CHATROOM_UPDATE_ANNOUNCEMENT", e3[e3.CHATROOM_REMOVE_SHARE_FILE = 131] = "CHATROOM_REMOVE_SHARE_FILE", e3[e3.CHATROOM_GET_SHARE_FILE_LIST = 132] = "CHATROOM_GET_SHARE_FILE_LIST", e3[e3.CHATROOM_UPLOAD_FILE = 133] = "CHATROOM_UPLOAD_FILE", e3[e3.CHATROOM_SET_META_DATA = 134] = "CHATROOM_SET_META_DATA", e3[e3.CHATROOM_DELETE_META_DATA = 135] = "CHATROOM_DELETE_META_DATA", e3[e3.CHATROOM_FETCH_META_DATA = 136] = "CHATROOM_FETCH_META_DATA", e3[e3.CHATROOM_OPERATE = 150] = "CHATROOM_OPERATE";
          }(g || (g = {})), function(e3) {
            e3.SDK_INTERNAL = "SDK_INTERNAL", e3.LOGIN = "USER_LOGIN", e3.REGISTER = "USER_CREATE", e3.GET_CHATROOM_LIST = "CHATROOM_FETCH_CHATROOMSWITHPAGE", e3.CREATE_CHATROOM = "CHATROOM_CREATECHATROOM", e3.DESTROY_CHATROOM = "CHATROOM_DESTORYCHATROOM", e3.GET_CHATROOM_DETAIL = "CHATROOM_FETCH_SPECIFICATION", e3.MODIFY_CHATROOM = "CHATROOM_CHANGE_ATTRIBUTE", e3.REMOVE_CHATROOM_MEMBER = "CHATROOM_REMOVE_MEMBER", e3.MULTI_REMOVE_CHATROOM_MEMBER = "CHATROOM_REMOVE_MEMBERS", e3.ADD_USERS_TO_CHATROOM = "CHATROOM_ADD_MEMBERS", e3.JOIN_CHATROOM = "CHATROOM_JOINCAHTROOM", e3.QUIT_CHATROOM = "CHATROOM_LEAVECAHTROOM", e3.LIST_CHATROOM_MEMBERS = "CHATROOM_FETCH_MEMBERS", e3.GET_CHATROOM_ADMIN = "CHATROOM_GET_ADMIN", e3.SET_CHATROOM_ADMIN = "CHATROOM_SET_ADMIN", e3.REMOVE_CHATROOM_ADMIN = "CHATROOM_REMOVE_ADMIN", e3.MUTE_CHATROOM_MEMBER = "CHATROOM_MUTE_USER", e3.REMOVE_MUTE_CHATROOM_MEMBER = "CHATROOM_UNMUTE_USER", e3.GET_MUTE_CHATROOM_MEMBERS = "CHATROOM_FETCH_MUTES", e3.SET_CHATROOM_MEMBER_TO_BLACK = "CHATROOM_BLOCK_USER", e3.MULTI_SET_CHATROOM_MEMBER_TO_BLACK = "CHATROOM_BLOCK_USERS", e3.REMOVE_CHATROOM_MEMBER_BLACK = "CHATROOM_UNBLOCK_USER", e3.MULTI_REMOVE_CHATROOM_MEMBER_BLACK = "CHATROOM_UNBLOCK_USERS", e3.GET_CHATROOM_BLOCK_MEMBERS = "CHATROOM_FETCH_BANS", e3.DISABLED_CHATROOM_SEND_MSG = "CHATROOM_MUTE_ALLMEMEBERS", e3.ENABLE_CHATROOM_SEND_MSG = "CHATROOM_UNMUTE_ALLMEMEBERS", e3.ADD_CHATROOM_WHITE_USERS = "CHATROOM_ADD_WHITELIST", e3.REMOVE_CHATROOM_WHITE_USERS = "CHATROOM_REMOVE_WHITELIST", e3.GET_CHATROOM_WHITE_USERS = "CHATROOM_FETCH_WHITELIST", e3.CHECK_CHATROOM_WHITE_USER = "CHATROOM_FETCH_MEMBERIN_WHITELIST", e3.GET_CHATROOM_ANN = "CHATROOM_FETCH_ANNOUNCEMENT", e3.UPDATE_CHATROOM_ANN = "CHATROOM_UPDATE_ANNOUNCEMENT", e3.DELETE_CHATROOM_FILE = "CHATROOM_REMOVE_SHARE_FILE", e3.GET_CHATROOM_FILES = "CHATROOM_GET_SHARE_FILE_LIST", e3.UPLOAD_CHATROOM_FILE = "CHATROOM_UPLOAD_FILE", e3.SET_CHATROOM_ATTR = "CHATROOM_SET_META_DATA", e3.DELETE_CHATROOM_ATTR = "CHATROOM_DELETE_META_DATA", e3.GET_CHATROOM_ATTR = "CHATROOM_FETCH_META_DATA", e3.CREATE_GROUP = "GROUP_CREATEGROUP", e3.BLOCK_GROUP = "GROUP_BLOCK_MESSAGE", e3.LIST_GROUP = "GROUP_FETCH_PUBLICGROUPS_WITHCURSOR", e3.GET_USER_GROUP = "GROUP_FETCH_USERS_GROUP", e3.CHANGE_OWNER = "GROUP_CHANGE_OWNER", e3.GET_GROUP_INFO = "GROUP_FETCH_SPECIFICATION", e3.MODIFY_GROUP = "GROUP_CHANGE_GROUPATTRIBUTE", e3.LIST_GROUP_MEMBER = "GROUP_FETCH_MEMEBERS", e3.GET_GROUP_ADMIN = "GROUP_GET_ADMIN", e3.SET_GROUP_ADMIN = "GROUP_SET_ADMIN", e3.REMOVE_GROUP_ADMIN = "GROUP_REMOVE_ADMIN", e3.DISSOLVE_GROUP = "GROUP_DESTOTYGROUP", e3.QUIT_GROUP = "GROUP_LEAVEGROUP", e3.INVITE_TO_GROUP = "GROUP_INVITE_TO_GROUP", e3.JOIN_GROUP = "GROUP_JOIN_PUBLICGROUP", e3.AGREE_JOIN_GROUP = "GROUP_ACCEPT_JOINPUBLICGROUPAPPL", e3.REJECT_JOIN_GROUP = "GROUP_DECLINE_JOINPUBLICGROUPAPPL", e3.AGREE_INVITE_GROUP = "GROUP_ACCEPT_INVITATION", e3.REJECT_INVITE_GROUP = "GROUP_DECLINE_INVITATION", e3.REMOVE_GROUP_MEMBER = "GROUP_REMOVE_MEMBER", e3.MULTI_REMOVE_GROUP_MEMBER = "GROUP_REMOVE_MEMBERS", e3.MUTE_GROUP_MEMBER = "GROUP_MUTE_MEMBERS", e3.UNMUTE_GROUP_MEMBER = "GROUP_UNMUTE_MEMBERS", e3.GET_GROUP_MUTE_LIST = "GROUP_FETCH_MUTES", e3.BLOCK_GROUP_MEMBER = "GROUP_BLOCK_MEMBER", e3.BLOCK_GROUP_MEMBERS = "GROUP_BLOCK_MEMBERS", e3.UNBLOCK_GROUP_MEMBER = "GROUP_UNBLOCK_MEMBER", e3.UNBLOCK_GROUP_MEMBERS = "GROUP_UNBLOCK_MEMBERS", e3.GET_GROUP_BLACK_LIST = "GROUP_GET_BLOCK_LIST", e3.DISABLED_SEND_GROUP_MSG = "GROUP_MUTE_ALLMEMBERS", e3.ENABLE_SEND_GROUP_MSG = "GROUP_UNMUTE_ALLMEMBERS", e3.ADD_USERS_TO_GROUP_WHITE = "GROUP_ADD_WHITELIST", e3.REMOVE_GROUP_WHITE_MEMBER = "GROUP_REMOVE_WHITELIST", e3.GET_GROUP_WHITE_LIST = "GROUP_FETCH_WHITELIST", e3.IS_IN_GROUP_WHITE_LIST = "GROUP_IS_IN_WHITELIST", e3.GET_GROUP_MSG_READ_USER = "GROUP_GET_READ_USERS", e3.GET_GROUP_ANN = "GROUP_FETCH_ANNOUNCEMENT", e3.UPDATE_GROUP_ANN = "GROUP_UPDATE_ANNOUNCEMENT", e3.UPLOAD_GROUP_FILE = "GROUP_UPLOAD_SHAREDFILE", e3.DELETE_GROUP_FILE = "GROUP_DELETE_SHAREDFILE", e3.GET_GROUP_FILE_LIST = "GROUP_FETCH_SHAREDFILE", e3.DOWN_GROUP_FILE = "GROUP_DOWNLOAD_SHAREDFILE", e3.SET_GROUP_MEMBER_ATTRS = "GROUP_MEMBER_SET_META_DATA", e3.GET_GROUP_MEMBER_ATTR = "GROUP_MEMBER_FETCH_META_DATA", e3.GET_SESSION_LIST = "REST_GET_SESSION_LIST", e3.DELETE_SESSION = "REST_DEL_SESSION", e3.GET_HISTORY_MSG = "REST_GET_HISTORY_MESSAGE", e3.UPDATE_USER_INFO = "USER_UPDATE_USERINFO", e3.GET_USER_INFO = "USER_FETCH_USERINFO", e3.UPDATE_USER_NICK = "USER_UPDATE_NICK", e3.UPLOAD_PUSH_TOKEN = "USER_UPLOAD_PUSH_TOKEN", e3.GET_BLACK_LIST = "ROSTER_BLACKLIST", e3.GET_CONTACTS = "ROSTER_CONTACTS", e3.add = "ROSTER_ADD", e3.remove = "ROSTER_REMOVE", e3.accept = "ROSTER_ACCEPT", e3.decline = "ROSTER_DECLINE", e3.ban = "ROSTER_BAN", e3.allow = "ROSTER_ALLOW", e3.SEND_MSG = "MSYNC_SENDMESSAGE", e3.UPLOAD_MSG_ATTACH = "UPLOAD_MSG_ATTACH", e3.SEND_RECALL_MSG = "MSYNC_RECALLMESSAGE";
          }(E || (E = {})), function(e3) {
            e3.GET_DNS = "REST_DNSLIST", e3.LOGIN_BY_AGORA_TOKEN = "LOGIN_BY_AGORA_TOKEN", e3.LOGIN_BY_PWD = "LOGIN_BY_PWD", e3.RESISTER = "REGISTER";
          }(y || (y = {})), function(e3) {
            e3[e3["5G"] = 7] = "5G", e3[e3["4G"] = 7] = "4G", e3[e3["3G"] = 7] = "3G", e3[e3["2G"] = 7] = "2G", e3[e3["SLOW-2G"] = 7] = "SLOW-2G", e3[e3.WIFI = 2] = "WIFI", e3[e3.LAN = 1] = "LAN", e3[e3.DISCONNECTED = 0] = "DISCONNECTED", e3[e3.NONE = 0] = "NONE", e3[e3.UNKNOWN = -1] = "UNKNOWN", e3[e3["WEBIM UNABLE TO GET"] = -2] = "WEBIM UNABLE TO GET";
          }(T || (T = {})), function(e3) {
            e3[e3.success = 200] = "success", e3[e3.failed = 500] = "failed";
          }(_ || (_ = {})), function(e3) {
            e3[e3.web = 0] = "web", e3[e3.native = 1] = "native";
          }(v || (v = {}));
          var R = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), S = 1e3, C = 9675;
          function N() {
            console.log && (console.log.apply ? console.log.apply(console, Array.prototype.slice.call(arguments)) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
          }
          var A, M = "undefined" != typeof window && void 0 !== window.navigator && /Trident\/|MSIE /.test(window.navigator.userAgent), b = function(e3, t3, r2) {
            if (r2 || 2 === arguments.length)
              for (var o2, n2 = 0, i2 = t3.length; n2 < i2; n2++)
                !o2 && n2 in t3 || (o2 || (o2 = Array.prototype.slice.call(t3, 0, n2)), o2[n2] = t3[n2]);
            return e3.concat(o2 || Array.prototype.slice.call(t3));
          }, U = function() {
          }, w = {};
          !function(e3) {
            e3[e3.TRACE = 0] = "TRACE", e3[e3.DEBUG = 1] = "DEBUG", e3[e3.INFO = 2] = "INFO", e3[e3.WARN = 3] = "WARN", e3[e3.ERROR = 4] = "ERROR", e3[e3.SILENT = 5] = "SILENT";
          }(A || (A = {}));
          var k = function() {
            function e3(e4, t3, r2) {
              this.name = e4 || "defaultLogger", this.currentLevel = 0, this.useCookiePersist = false, this.storageLogLevelKey = "loglevel", this.levels = A, this.logMethods = ["trace", "debug", "info", "warn", "error"], this.methodFactory = r2 || this.defaultMethodFactory;
              var o2 = this._getPersistedLevel();
              null == o2 && (o2 = null === t3 ? "WARN" : t3), this.logs = [], this.config = { useCache: false, maxCache: 3145728, color: "", background: "" }, this.logBytes = 0, this.setLevel(o2, false, "");
            }
            return e3.prototype.setConfig = function(e4) {
              this.config = e4;
            }, e3.prototype.getLevel = function() {
              return this.currentLevel;
            }, e3.prototype.setLevel = function(e4, t3, r2) {
              if ("string" == typeof e4 && (e4 = A[e4]), void 0 === e4 && (e4 = 0), !("number" == typeof e4 && e4 >= 0 && e4 <= this.levels.SILENT))
                throw Error("log.setLevel() called with invalid level: " + e4);
              if (this.currentLevel = e4, false !== t3 && this._persistLevel(e4), this.replaceLoggingMethods(e4, r2), "undefined" == typeof console && e4 < A.SILENT)
                throw Error("No console available for logging");
            }, e3.prototype.setDefaultLevel = function(e4) {
              this._getPersistedLevel() || this.setLevel(e4, false, "");
            }, e3.prototype.enableAll = function(e4) {
              this.setLevel(this.levels.TRACE, true, "");
            }, e3.prototype.disableAll = function(e4) {
              this.setLevel(this.levels.SILENT, true, "");
            }, e3.prototype.getLogs = function() {
              return this.logs;
            }, e3.prototype.download = function() {
              if ("undefined" != typeof window && "undefined" != typeof document) {
                var e4 = this.getLogs().join("\n"), t3 = new Blob([e4], { type: "text/plain;charset=UTF-8" }), r2 = window.URL.createObjectURL(t3), o2 = document.createElement("a");
                o2.style.display = "none", o2.href = r2, o2.setAttribute("download", "sdklog"), document.body.appendChild(o2), o2.click();
              }
            }, e3.prototype._bindMethod = function(e4, t3, r2) {
              var o2 = this, n2 = e4[t3], i2 = this.getTime();
              if (r2)
                return this._cacheLog;
              if ("function" == typeof n2.bind)
                return function() {
                  for (var r3 = [], i3 = 0; i3 < arguments.length; i3++)
                    r3[i3] = arguments[i3];
                  var a2 = o2.getTime();
                  n2.call.apply(n2, b([e4, "".concat(a2, " IM SDK [").concat("log" === t3 ? "debug" : t3, "]: ")], r3, false)), o2.onLog && o2.onLog({ time: a2, level: "log" === t3 ? "debug" : t3, logs: r3 });
                };
              try {
                return Function.prototype.bind.call(n2, e4, "".concat(i2, " IM SDK [").concat("log" === t3 ? "debug" : t3, "]: "));
              } catch (t4) {
                return function() {
                  return Function.prototype.apply.apply(n2, [e4, arguments]);
                };
              }
            }, e3.prototype.getTime = function() {
              var e4 = new Date();
              return e4.toTimeString().split(" ")[0] + ":" + e4.getMilliseconds();
            }, e3.prototype._cacheLog = function() {
              for (var e4 = [], t3 = 0; t3 < arguments.length; t3++)
                e4[t3] = arguments[t3];
              var r2 = new Date().toLocaleString() + ": ", o2 = "";
              e4.forEach(function(e5) {
                o2 += "object" == typeof e5 ? JSON.stringify(e5) + " " : e5 + " ";
              }), this._cacheLogCall(r2 + o2);
            }, e3.prototype._cacheLogCall = function(e4) {
              var t3 = P(e4), r2 = this.logBytes + t3, o2 = this.config.maxCache;
              if (!(t3 >= o2)) {
                if (r2 < o2)
                  this.logBytes += t3;
                else
                  for (var n2 = r2 - o2, i2 = 0; i2 < n2; ) {
                    var a2 = this.logs.shift();
                    void 0 !== a2 && (i2 += P(a2));
                  }
                this.logs.push(e4);
              }
            }, e3.prototype._getPersistedLevel = function() {
              var e4;
              if ("undefined" == typeof window)
                return 5;
              if ("undefined" === (e4 = window && window.localStorage && window.localStorage[this.storageLogLevelKey])) {
                var t3 = window.document.cookie, r2 = t3.indexOf(encodeURIComponent(this.storageLogLevelKey));
                -1 !== r2 && (e4 = /^([^;]+)/.exec(t3.slice(r2))[1]);
              }
              return e4 || 5;
            }, e3.prototype._persistLevel = function(e4) {
              var t3 = this.logMethods[e4] || "SILENT";
              "undefined" != typeof window && (window.localStorage && (window.localStorage[this.storageLogLevelKey] = t3), this.useCookiePersist && (window.document.cookie = encodeURIComponent(this.storageLogLevelKey) + "=" + t3 + ";"));
            }, e3.prototype.replaceLoggingMethods = function(e4, t3) {
              for (var r2 = 0; r2 < this.logMethods.length; r2++) {
                var o2 = this.logMethods[r2];
                this[o2] = r2 < e4 ? U : this.methodFactory(o2, e4, t3);
              }
              this.log = this.debug;
            }, e3.prototype.defaultMethodFactory = function(e4, t3, r2) {
              return this.realMethod(e4) || this.enableLoggingWhenConsoleArrives.apply(this, [e4, t3, r2]);
            }, e3.prototype.realMethod = function(e4) {
              return "debug" === e4 && (e4 = "log"), "undefined" != typeof console && ("trace" === e4 && M ? N : void 0 !== console[e4] ? this._bindMethod(console, e4, this.config.useCache) : void 0 !== console.log ? this._bindMethod(console, "log", this.config.useCache) : U);
            }, e3.prototype.enableLoggingWhenConsoleArrives = function(e4, t3, r2) {
              return function() {
                "undefined" != typeof console && (this.replaceLoggingMethods.call(this, t3, r2), this[e4].apply(this, arguments));
              }.bind(this);
            }, e3;
          }();
          function P(e3) {
            for (var t3 = e3.length, r2 = 0; r2 < e3.length; r2++)
              e3.charCodeAt(r2) > 255 && t3++;
            return t3;
          }
          var L = new k();
          L.getLogger = function(e3) {
            if ("string" != typeof e3 || "" === e3)
              throw new TypeError("You must supply a name when creating a logger.");
            return this;
          };
          var D = "undefined" != typeof window ? window.log : void 0;
          L.noConflict = function() {
            return "undefined" != typeof window && window.log === L && (window.log = D), L;
          }, L.getLoggers = function() {
            return w;
          };
          var G = L, x = function() {
            return x = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, x.apply(this, arguments);
          }, B = function() {
          };
          function H(e3, t3) {
            var r2, o2 = this;
            return z().platform === K.WEB ? new Promise(function(t4, o3) {
              var n2 = e3.dataType || "text", i2 = e3.success || B, a2 = e3.error || B, s2 = new XMLHttpRequest();
              s2.ontimeout = function() {
                o3({ type: p.REQUEST_TIMEOUT, message: "Request Timeout", errorType: "timeout_error", xhr: s2 });
              }, s2.onerror = function() {
                o3({ type: p.REQUEST_UNKNOWN, message: "Request Unknow Error", errorType: "onerror", xhr: s2 });
              }, s2.onabort = function() {
                o3({ type: p.REQUEST_ABORT, message: "Request Abort", errorType: "onabort", xhr: s2 });
              }, s2.onreadystatechange = function() {
                if (4 === s2.readyState) {
                  var e4 = new Date().getTime() - r2, c3 = s2.status || 0, u3 = { elapse: e4, httpCode: c3 };
                  if (200 === c3) {
                    $2.ajaxUnconventionalErrorTimes = 0;
                    try {
                      switch (n2) {
                        case "text":
                          return i2(s2.responseText), void t4(s2.responseText);
                        case "json":
                          var l3 = JSON.parse(s2.responseText);
                          return l3.extraInfo = u3, i2(l3), void t4(l3);
                        case "xml":
                          return s2.responseXML && s2.responseXML.documentElement ? (i2(s2.responseXML.documentElement), void t4(s2.responseXML.documentElement)) : (a2({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "XHR.responseXML is null or XHR.responseXML.documentElement is null" }), void o3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "XHR.responseXML is null or XHR.responseXML.documentElement is null" }));
                        default:
                          a2({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "Invalid dataType" }), o3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "Invalid dataType" });
                      }
                      return t4(s2.response || s2.responseText), void i2(s2.response || s2.responseText, s2);
                    } catch (e5) {
                      o3(e5);
                    }
                    return;
                  }
                  [400, 401, 403, 404, 429, 500, 503].includes(c3) || (G.debug("rest api request fail status:", c3), $2.ajaxUnconventionalErrorTimes++), function(e5, t5, r3, o4) {
                    var n3, i3, a3, s3, c4, u4, l4, d3, h3, f3, m2, g2, E2, y2, T2, _2, v2, R2, I2, S2, C2 = e5.response;
                    C2 && "string" == typeof C2 && (C2 = JSON.parse(C2));
                    var N2 = e5.status, A2 = { elapse: o4, httpCode: N2, errDesc: null == C2 ? void 0 : C2.error_description };
                    if (400 === N2) {
                      if (40002 === C2.error_code)
                        return void t5({ type: p.THREAD_ALREADY_EXIST, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                      if (40009 === C2.error_code)
                        return void t5({ type: p.OPERATION_UNSUPPORTED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                      if (60005 === C2.error_code)
                        return void t5({ type: p.GROUP_MEMBER_ATTRIBUTES_SET_FAILED, message: (null == C2 ? void 0 : C2.desc) || (null == C2 ? void 0 : C2.error_description), extraInfo: A2 });
                      if (60010 === C2.error_code)
                        return void ((null == C2 ? void 0 : C2.error_description.includes("exceeds chatgroup user metadata single value limit")) ? t5({ type: p.MAX_LIMIT, message: (null == C2 ? void 0 : C2.desc) || C2.error_description, extraInfo: A2 }) : t5({ type: p.NO_PERMISSION, message: (null == C2 ? void 0 : C2.desc) || C2.error_description, extraInfo: A2 }));
                      if (60011 === C2.error_code)
                        return void t5({ type: p.CHATROOM_NOT_JOINED, message: null == C2 ? void 0 : C2.desc, extraInfo: A2 });
                      if (60006 === C2.error_code || 60007 === C2.error_code || 60009 === C2.error_code || 60012 === C2.error_code)
                        return void t5({ type: p.MAX_LIMIT, message: (null == C2 ? void 0 : C2.desc) || (null == C2 ? void 0 : C2.error_description), extraInfo: A2 });
                      if (null === (n3 = C2.error_description) || void 0 === n3 ? void 0 : n3.includes("are not members of this group"))
                        return (null === (i3 = e5.responseURL) || void 0 === i3 ? void 0 : i3.includes("chatgroups")) ? t5({ type: p.GROUP_NOT_JOINED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : t5({ type: p.CHATROOM_NOT_JOINED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }), void r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, message: null == C2 ? void 0 : C2.error_description, data: e5.responseText, extraInfo: A2 });
                      if ("the app not open presence" === (null == C2 ? void 0 : C2.result))
                        return void t5({ type: p.SERVICE_NOT_ENABLED, message: null == C2 ? void 0 : C2.result, extraInfo: A2 });
                      switch (null == C2 ? void 0 : C2.error_description) {
                        case "the user is already operation this message":
                          t5({ type: p.REACTION_ALREADY_ADDED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "The quantity has exceeded the limit!":
                          t5({ type: p.MAX_LIMIT, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "The user not in this group!":
                          t5({ type: p.GROUP_NOT_JOINED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "the user operation is illegal!":
                          t5({ type: p.REACTION_OPERATION_IS_ILLEGAL, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "this appKey is not open reaction service!":
                        case "this appKey not open message roaming":
                          t5({ type: p.SERVICE_NOT_ENABLED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "this message is creating reaction, please try again.":
                          t5({ type: p.REACTION_CREATING, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "groupId can not be null!":
                          t5({ type: p.GROUP_NOT_EXIST, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "The input text is too long.":
                          t5({ type: p.TRANSLATION_TEXT_TOO_LONG, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "The target language is not valid.":
                          t5({ type: p.TRANSLATION_NOT_VALID, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "report failed, get message by id failed":
                          t5({ type: p.MESSAGE_NOT_FOUND, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "ext is too big ":
                          t5({ type: p.PRESENCE_PARAM_EXCEED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        case "Request body not readable.Please check content type is correct!":
                          t5({ type: p.REQUEST_PARAMETER_ERROR, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 });
                          break;
                        default:
                          t5({ type: p.WEBIM_CONNCTION_AJAX_ERROR, message: null == C2 ? void 0 : C2.error_description, data: e5.responseText, extraInfo: A2 }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, message: null == C2 ? void 0 : C2.error_description, data: e5.responseText, extraInfo: A2 });
                      }
                    } else if (401 === N2)
                      40001 === C2.error_code || 60001 === C2.error_code || "Unable to authenticate (OAuth)" === C2.error_description ? t5({ type: p.NO_PERMISSION, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : (r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: e5.responseText, extraInfo: A2 }), t5({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: e5.responseText, extraInfo: A2 }));
                    else if (403 === N2)
                      4e4 === C2.error_code || 60004 === C2.error_code ? t5({ type: p.SERVICE_NOT_ENABLED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : 40003 === C2.error_code || 40004 === C2.error_code ? t5({ type: p.THREAD_ALREADY_EXIST, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : 40005 === C2.error_code || 40007 === C2.error_code ? t5({ type: p.MAX_LIMIT, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : 60002 === C2.error_code && t5({ type: p.PERMISSION_DENIED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }), "group member list is full!" === C2.error_description ? (null === (a3 = e5.responseURL) || void 0 === a3 ? void 0 : a3.includes("chatgroups")) ? t5({ type: p.GROUP_MEMBERS_FULL, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : t5({ type: p.CHATROOM_MEMBERS_FULL, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : (null === (s3 = C2.error_description) || void 0 === s3 ? void 0 : s3.includes(C2.error_description.includes("already in group"))) ? (null === (c4 = e5.responseURL) || void 0 === c4 ? void 0 : c4.includes("chatgroups")) && t5({ type: p.GROUP_ALREADY_JOINED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : (null === (u4 = C2.error_description) || void 0 === u4 ? void 0 : u4.includes("are not members of this group")) ? (null === (l4 = e5.responseURL) || void 0 === l4 ? void 0 : l4.includes("chatgroups")) ? t5({ type: p.GROUP_NOT_JOINED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : t5({ type: p.CHATROOM_NOT_JOINED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : (null === (d3 = C2.error_description) || void 0 === d3 ? void 0 : d3.includes("service not open!")) || (null === (h3 = C2.error_description) || void 0 === h3 ? void 0 : h3.includes("message report not open")) || (null === (f3 = C2.error_description) || void 0 === f3 ? void 0 : f3.includes("messageroaming function not open")) ? t5({ type: p.SERVICE_NOT_ENABLED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : (null === (m2 = C2.error_description) || void 0 === m2 ? void 0 : m2.includes("members size is greater than max user size !")) ? t5({ type: p.GROUP_MEMBERS_LIMIT, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : (null === (g2 = C2.error_description) || void 0 === g2 ? void 0 : g2.includes("can not operate this group, reason: group is disabled")) ? t5({ type: p.GROUP_IS_DISABLED, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : t5({ type: p.PERMISSION_DENIED, data: e5.response || e5.responseText, message: "permission denied", extraInfo: O(O({}, A2), { errDesc: "permission denied" }) }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: e5.responseText, extraInfo: A2 });
                    else if (404 === N2)
                      40011 === C2.error_code ? t5({ type: p.THREAD_NOT_EXIST, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : 40012 === C2.error_code ? t5({ type: p.NO_PERMISSION, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }) : 60003 !== C2.error_code && 20004 !== C2.error_code || t5({ type: p.GROUP_NOT_JOINED, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }), (null === (E2 = C2.error_description) || void 0 === E2 ? void 0 : E2.includes("do not find this group")) || (null === (y2 = C2.error_description) || void 0 === y2 ? void 0 : y2.includes("does not exist")) ? (null === (T2 = e5.responseURL) || void 0 === T2 ? void 0 : T2.includes("chatgroups")) ? t5({ type: p.GROUP_NOT_EXIST, data: e5.response || e5.responseText, message: "The chat room dose not exist.", extraInfo: O(O({}, A2), { errDesc: "The chat room dose not exist." }) }) : t5({ type: p.CHATROOM_NOT_EXIST, data: e5.response || e5.responseText, message: "The chat room dose not exist.", extraInfo: O(O({}, A2), { errDesc: "The chat room dose not exist." }) }) : (null === (_2 = C2.error_description) || void 0 === _2 ? void 0 : _2.includes("username")) && (null === (v2 = C2.error_description) || void 0 === v2 ? void 0 : v2.includes("doesn't exist!'")) || (null === (R2 = C2.error_description) || void 0 === R2 ? void 0 : R2.includes("user not found")) ? t5({ type: p.USER_NOT_FOUND, data: e5.response || e5.responseText, message: C2.error_description, extraInfo: A2 }) : t5({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.response || e5.responseText, message: e5.responseText, extraInfo: A2 }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.response || e5.responseText, message: e5.responseText, extraInfo: A2 });
                    else if (429 === N2 || 503 === N2) {
                      if (null === (I2 = C2.error_description) || void 0 === I2 ? void 0 : I2.includes("The request has reached the maximum limit"))
                        return void t5({ type: p.MAX_LIMIT, message: e5.responseText, extraInfo: A2 });
                      t5({ type: p.SERVER_BUSY, data: e5.response || e5.responseText, message: "Server is busy.", extraInfo: O(O({}, A2), { errDesc: "Server is busy." }) }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: "Server is busy.", extraInfo: O(O({}, A2), { errDesc: "Server is busy." }) });
                    } else if (500 === N2) {
                      if ((40006 === C2.error_code || 40008 === C2.error_code || 40010 === C2.error_code) && t5({ type: p.SERVER_UNKNOWN_ERROR, message: null == C2 ? void 0 : C2.error_description, extraInfo: A2 }), null === (S2 = C2.error_description) || void 0 === S2 ? void 0 : S2.includes("translte failed!"))
                        return void t5({ type: p.TRANSLATION_FAILED, message: e5.responseText, extraInfo: A2 });
                      t5({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: "", extraInfo: A2 }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: "", extraInfo: A2 });
                    } else
                      t5({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: e5.responseText, extraInfo: O(O({}, A2), { errDesc: "ajax error" }) }), r3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: e5.responseText, message: e5.responseText, extraInfo: O(O({}, A2), { errDesc: "ajax error" }) });
                  }(s2, o3, a2, e4);
                }
                0 === s2.readyState && (a2({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "Request not initialized" }), o3({ type: p.WEBIM_CONNCTION_AJAX_ERROR, data: s2.responseText, message: "Request not initialized" }));
              }, e3.responseType && s2.responseType && (s2.responseType = e3.responseType), e3.mimeType && s2.overrideMimeType(e3.mimeType);
              var c2 = e3.type || "POST", u2 = e3.data || null, l2 = "";
              if ("get" === c2.toLowerCase() && u2) {
                for (var d2 in u2)
                  u2.hasOwnProperty(d2) && (l2 += d2 + "=" + u2[d2] + "&");
                l2 = l2 ? l2.slice(0, -1) : l2, e3.url += (e3.url.indexOf("?") > 0 ? "&" : "?") + (l2 ? l2 + "&" : l2) + "_v=" + new Date().getTime(), u2 = null, l2 = "";
              }
              r2 = new Date().getTime(), s2.open(c2, e3.url);
              var h2 = e3.headers || {};
              for (var f2 in h2["Content-Type"] || (h2["Content-Type"] = "application/json"), h2)
                h2.hasOwnProperty(f2) && s2.setRequestHeader(f2, h2[f2]);
              s2.send(u2);
            }).then(function(r3) {
              return o2.dataReport && t3 && t3 !== E.SDK_INTERNAL && o2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: x({ isSuccess: 1, requestUrl: e3.url, requestName: t3, requestMethod: e3.type }, Q(r3.extraInfo)) }), t3 !== E.SDK_INTERNAL && delete r3.extraInfo, "Object" === j(r3) ? x(x({}, r3), { type: p.REQUEST_SUCCESS }) : { data: r3, type: p.REQUEST_SUCCESS };
            }).catch(function(r3) {
              throw o2.dataReport && t3 && t3 !== E.SDK_INTERNAL && o2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: x({ isSuccess: 0, requestUrl: e3.url, requestName: t3, requestMethod: e3.type }, Q(r3.extraInfo)) }), t3 !== E.SDK_INTERNAL && delete r3.extraInfo, r3;
            }) : F.call(this, e3, t3);
          }
          function j(e3) {
            return Object.prototype.toString.call(e3).slice(8, -1);
          }
          function F(e3, t3) {
            var r2 = this;
            return new Promise(function(t4, r3) {
              var o2 = e3.success || B, n2 = e3.error || B, i2 = e3.type || "POST", a2 = e3.data || null, s2 = "", c2 = new Date().getTime(), u2 = $2.getEnvInfo();
              if ("get" === i2.toLowerCase() && a2) {
                for (var l2 in a2)
                  a2.hasOwnProperty(l2) && (s2 += l2 + "=" + a2[l2] + "&");
                s2 = s2 ? s2.slice(0, -1) : s2, e3.url += (e3.url.indexOf("?") > 0 ? "&" : "?") + (s2 ? s2 + "&" : s2) + "_v=" + new Date().getTime(), a2 = null, s2 = "";
              }
              var p2 = { url: e3.url, data: e3.data, method: i2, headers: {}, success: function(e4) {
                var i3, a3, s3, u3, l3, p3 = { elapse: new Date().getTime() - c2, httpCode: Number((null === (i3 = e4.statusCode) || void 0 === i3 ? void 0 : i3.toString()) || (null === (a3 = e4.status) || void 0 === a3 ? void 0 : a3.toString())), errDesc: (null === (s3 = null == e4 ? void 0 : e4.data) || void 0 === s3 ? void 0 : s3.error_description) || "" };
                if ("200" === (null === (u3 = e4.statusCode) || void 0 === u3 ? void 0 : u3.toString()) || "200" === (null === (l3 = e4.status) || void 0 === l3 ? void 0 : l3.toString())) {
                  e4.data.extraInfo = p3;
                  var d2 = e4.data;
                  o2(d2), t4(d2);
                } else
                  e4.extraInfo = p3, n2(d2 = e4), r3(d2);
              }, complete: function() {
              }, fail: function(e4) {
                var t5 = { elapse: new Date().getTime() - c2, httpCode: -1, errDesc: "request:fail" };
                e4.extraInfo = t5, e4.data = { error: "request:fail", error_description: "request:fail" }, n2(e4), r3(e4);
              } };
              if ("zfb" === u2.platform || "dd" === u2.platform ? p2.headers = e3.headers : p2.header = e3.headers, "dd" === u2.platform)
                return dd.httpRequest(p2);
              u2.global.request(p2);
            }).then(function(o2) {
              return r2.dataReport && t3 && t3 !== E.SDK_INTERNAL && r2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: x({ isSuccess: 1, requestUrl: e3.url, requestName: t3, requestMethod: e3.type }, Q(o2.extraInfo)) }), t3 !== E.SDK_INTERNAL && delete o2.extraInfo, "Object" === j(o2) ? x(x({}, o2), { type: p.REQUEST_SUCCESS }) : { data: o2, type: p.REQUEST_SUCCESS };
            }).catch(function(o2) {
              throw r2.dataReport && t3 && t3 !== E.SDK_INTERNAL && r2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: x({ isSuccess: 0, requestUrl: e3.url, requestName: t3, requestMethod: e3.type }, Q(o2.extraInfo)) }), t3 !== E.SDK_INTERNAL && delete o2.extraInfo, o2;
            });
          }
          var W, q, K, V = (W = function(e3, t3) {
            var r2 = z();
            if (r2.platform !== K.WEB) {
              var o2 = r2.global, n2 = function(r3) {
                r3.isConnected ? e3() : t3();
              };
              o2.offNetworkStatusChange && o2.offNetworkStatusChange(n2), o2.onNetworkStatusChange && o2.onNetworkStatusChange(n2);
            } else
              "undefined" != typeof addEventListener && (window.addEventListener("online", e3), window.addEventListener("offline", t3));
          }, function() {
            for (var e3 = [], t3 = 0; t3 < arguments.length; t3++)
              e3[t3] = arguments[t3];
            if (!W)
              return q;
            q = W.apply(void 0, e3), W = null;
          });
          function z() {
            return "undefined" != typeof swan && J(swan) ? { platform: K.BAIDU, global: swan } : "undefined" != typeof tt && J(tt) ? { platform: K.TT, global: tt } : "undefined" != typeof dd && J(dd) ? { platform: K.DD, global: dd } : "undefined" != typeof my && J(my) ? { platform: K.ZFB, global: my } : "undefined" != typeof wx && J(wx) ? { platform: K.WX, global: wx } : "undefined" != typeof uni && J(uni) ? { platform: K.UNI, global: uni } : "undefined" != typeof window && window.WebSocket ? { platform: K.WEB, global: window } : { platform: K.NODE, global: r.g || {} };
          }
          function J(e3) {
            for (var t3 = ["canIUse", "getSystemInfo"], r2 = 0, o2 = t3.length; r2 < o2; r2++)
              if (!e3[t3[r2]])
                return false;
            return true;
          }
          function X(e3, t3) {
            var r2, o2, n2 = this, i2 = new Date().getTime(), a2 = e3.accessToken;
            if (a2) {
              var s2 = e3.appKey, c2 = [], u2 = "", l2 = "";
              if (s2 && (u2 = (c2 = s2.split("#"))[0], l2 = c2[1]), u2 || l2) {
                var d2 = e3.apiUrl, h2 = e3.uploadUrl || d2 + "/" + u2 + "/" + l2 + "/chatfiles";
                if ((null === (o2 = null === (r2 = null == e3 ? void 0 : e3.file) || void 0 === r2 ? void 0 : r2.data) || void 0 === o2 ? void 0 : o2.size) <= 0)
                  e3.onFileUploadError && e3.onFileUploadError({ type: p.WEBIM_UPLOADFILE_ERROR, message: "fileSize must be greater than 0" });
                else {
                  var f2 = new XMLHttpRequest();
                  f2.upload && f2.upload.addEventListener("progress", e3.onFileUploadProgress || B, false), f2.addEventListener("abort", e3.onFileUploadCanceled || B, false), f2.addEventListener("error", function(e4) {
                    g2({ type: p.WEBIM_UPLOADFILE_ERROR, data: f2 });
                  }, false), f2.addEventListener("load", function(r3) {
                    try {
                      var o3 = JSON.parse(f2.responseText);
                      if (400 === f2.status)
                        return g2({ type: p.WEBIM_UPLOADFILE_ERROR, data: o3 }), false;
                      try {
                        !function(r4) {
                          var o4 = new Date().getTime() - i2;
                          n2.dataReport && t3 && [E.UPLOAD_MSG_ATTACH, E.UPLOAD_CHATROOM_FILE, E.UPLOAD_GROUP_FILE].includes(t3) && n2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: { isSuccess: (null == r4 ? void 0 : r4.error) ? 0 : 1, requestMethod: "POST", requestName: t3, requestElapse: o4, requestUrl: h2, code: f2.status, codeDesc: (null == r4 ? void 0 : r4.error_description) || "" } }), e3.onFileUploadComplete && e3.onFileUploadComplete(r4);
                        }(o3);
                      } catch (r4) {
                        g2({ type: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, data: r4 });
                      }
                    } catch (r4) {
                      g2({ type: p.WEBIM_UPLOADFILE_ERROR, data: f2.responseText });
                    }
                  }, false), f2.open("POST", h2), f2.setRequestHeader("restrict-access", "true"), f2.setRequestHeader("Accept", "*/*"), f2.setRequestHeader("Authorization", "Bearer " + a2);
                  var m2 = new FormData();
                  m2.append("file", e3.file.data), f2.send(m2);
                }
              } else
                e3.onFileUploadError && e3.onFileUploadError({ type: p.WEBIM_UPLOADFILE_ERROR, message: "AppKey illegal" });
            } else
              e3.onFileUploadError && e3.onFileUploadError({ type: p.WEBIM_UPLOADFILE_NO_LOGIN, message: "AccessToken cannot be empty" });
            function g2(r3) {
              var o3 = new Date().getTime() - i2;
              n2.dataReport && t3 && [E.UPLOAD_MSG_ATTACH, E.UPLOAD_CHATROOM_FILE, E.UPLOAD_GROUP_FILE].includes(t3) && n2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: { isSuccess: 0, requestMethod: "POST", requestName: t3, requestElapse: o3, requestUrl: h2, code: (null == f2 ? void 0 : f2.status) || 0, codeDesc: "upload file error" } }), e3.onFileUploadError && e3.onFileUploadError(r3);
            }
          }
          function Y(e3, t3) {
            e3.onFileDownloadComplete = e3.onFileDownloadComplete || B, e3.onFileDownloadError = e3.onFileDownloadError || B;
            var r2 = new Date().getTime(), o2 = new XMLHttpRequest(), n2 = this;
            o2.addEventListener("load", function(i3) {
              var a3 = new Date().getTime() - r2;
              n2.dataReport && t3 && t3 === E.DOWN_GROUP_FILE && n2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: { isSuccess: 200 === o2.status ? 1 : 0, requestMethod: "POST", requestName: t3, requestElapse: a3, requestUrl: null == e3 ? void 0 : e3.url, code: o2.status, codeDesc: 200 === o2.status ? "" : "download file error" } }), e3.onFileDownloadComplete && e3.onFileDownloadComplete(o2.response);
            }, false), o2.addEventListener("error", function(i3) {
              var a3 = new Date().getTime() - r2;
              n2.dataReport && t3 && t3 === E.DOWN_GROUP_FILE && n2.dataReport.geOperateFun({ operationName: t3 })({ isEndApi: true, data: { isSuccess: 0, requestMethod: "POST", requestName: t3, requestElapse: a3, requestUrl: null == e3 ? void 0 : e3.url, code: (null == o2 ? void 0 : o2.status) || 0, codeDesc: "download file error" } }), e3.onFileDownloadError && e3.onFileDownloadError({ type: p.WEBIM_DOWNLOADFILE_ERROR, id: e3.id, xhr: o2 });
            }, false);
            var i2 = e3.method || "GET", a2 = e3.responseType || "blob", s2 = e3.mimeType || "text/plain; charset=x-user-defined";
            o2.open(i2, e3.url), "undefined" != typeof Blob ? o2.responseType = a2 : o2.overrideMimeType(s2);
            var c2 = { "X-Requested-With": "XMLHttpRequest", Accept: "application/octet-stream", "share-secret": e3.secret, Authorization: "Bearer " + this.context.accessToken }, u2 = e3.headers || {};
            for (var l2 in u2)
              c2[l2] = u2[l2];
            for (var l2 in c2)
              c2[l2] && o2.setRequestHeader(l2, c2[l2]);
            o2.send(null);
          }
          function Q(e3) {
            void 0 === e3 && (e3 = {});
            var t3 = e3.elapse, r2 = void 0 === t3 ? 0 : t3, o2 = e3.httpCode, n2 = void 0 === o2 ? 0 : o2, i2 = e3.errDesc;
            return { requestElapse: r2, code: n2, codeDesc: void 0 === i2 ? "" : i2 };
          }
          !function(e3) {
            e3.WEB = "web", e3.WX = "wx", e3.ZFB = "zfb", e3.DD = "dd", e3.TT = "tt", e3.BAIDU = "baidu", e3.QUICK_APP = "quick_app", e3.UNI = "uni", e3.NODE = "node";
          }(K || (K = {}));
          var $2 = { autoIncrement: 0, ajaxUnconventionalErrorTimes: 0, ajax: H, getUniqueId: function() {
            this.autoIncrement ? this.autoIncrement++ : this.autoIncrement = 1;
            var e3 = new Date(), t3 = new Date(2010, 1, 1);
            return (e3.getTime() - t3.getTime() + this.autoIncrement).toString();
          }, getFileUrl: function(e3) {
            var t3 = { url: "", filename: "", filetype: "", data: {} }, r2 = "string" == typeof e3 ? document.getElementById(e3) : e3;
            if (window.URL.createObjectURL) {
              if (!r2.files)
                throw Error("this is not HTMLInputElement");
              var o2 = r2.files;
              if (o2.length > 0) {
                var n2 = o2.item(0);
                t3.data = n2, t3.url = window.URL.createObjectURL(n2), t3.filename = (null == n2 ? void 0 : n2.name) || "";
              }
            } else {
              if ("string" != typeof e3)
                throw Error("in IE fileInputId must be string");
              n2 = document.getElementById(e3).value, t3.url = n2;
              var i2 = n2.lastIndexOf("/"), a2 = n2.lastIndexOf("\\"), s2 = Math.max(i2, a2);
              t3.filename = s2 < 0 ? n2 : n2.substring(s2 + 1);
            }
            var c2 = t3.filename.lastIndexOf(".");
            return -1 !== c2 && (t3.filetype = t3.filename.substring(c2 + 1).toLowerCase()), t3;
          }, uploadFile: X, flow: function(e3) {
            for (var t3 = e3.length, r2 = t3; r2--; )
              if ("function" != typeof e3[r2])
                throw new TypeError("Expected a function");
            return function() {
              for (var r3 = [], o2 = 0; o2 < arguments.length; o2++)
                r3[o2] = arguments[o2];
              for (var n2 = 0, i2 = t3 ? e3[n2].apply(this, r3) : r3[0]; ++n2 < t3; )
                i2 = e3[n2].call(this, i2);
              return i2;
            };
          }, listenNetwork: V, getEnvInfo: z, wxRequest: F, parseDownloadResponse: function(e3) {
            if (!window || !window.URL)
              throw Error("parseDownloadResponse can be used in broswer only");
            return e3 && e3.type && "application/json" === e3.type || 0 > Object.prototype.toString.call(e3).indexOf("Blob") ? this.url + "?token=" : window.URL.createObjectURL(e3);
          }, download: Y, parseNotify: function(e3) {
            for (var t3 = "", r2 = 0; r2 < e3.length; r2++)
              t3 += "%" + e3[r2].toString(16);
            return JSON.parse(decodeURIComponent(t3));
          }, getExtraData: Q }, Z = r(491), ee = r.n(Z), te = function() {
            return te = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, te.apply(this, arguments);
          };
          function re(e3) {
            var t3, r2, o2 = e3.id, n2 = e3.payload, i2 = e3.timestamp, a2 = e3.to, s2 = n2.bodies && n2.bodies.length > 0 ? n2.bodies[0] : {}, c2 = {}, u2 = {}, l2 = n2.type ? n2.type : a2.indexOf("@conference.easemob.com") > -1 ? "groupChat" : "singleChat";
            switch (s2.type) {
              case "txt":
                c2 = { id: o2, type: "txt", chatType: l2, msg: s2.msg || "", to: n2.to || "", from: n2.from, time: i2, ext: n2.ext };
                break;
              case "img":
                c2 = { id: o2, type: "img", chatType: l2, to: n2.to, from: n2.from, time: i2, ext: n2.ext, width: (null === (t3 = s2.size) || void 0 === t3 ? void 0 : t3.width) || 0, height: (null === (r2 = s2.size) || void 0 === r2 ? void 0 : r2.height) || 0, secret: s2.secret || "", url: (null == s2 ? void 0 : s2.url) || "", file: {} };
                break;
              case "video":
                c2 = { id: o2, type: "video", chatType: l2, from: n2.from, to: n2.to, url: (null == s2 ? void 0 : s2.url) || "", secret: s2.secret || "", filename: s2.filename, length: s2.length || 0, file: {}, file_length: s2.fileLength || 0, filetype: n2.ext.file_type || "", ext: n2.ext, time: i2 };
                break;
              case "loc":
                c2 = { id: o2, type: "loc", chatType: l2, from: n2.from, to: n2.to, buildingName: s2.buildingName || "", addr: s2.addr, lat: s2.lat, lng: s2.lng, ext: n2.ext, time: i2 };
                break;
              case "audio":
                c2 = { id: o2, type: "audio", chatType: l2, from: n2.from, to: n2.to, secret: s2.secret || "", ext: n2.ext, time: i2, url: (null == s2 ? void 0 : s2.url) || "", file: {}, filename: s2.filename, length: n2.ext.duration || 0, file_length: s2.fileLength || 0, filetype: n2.ext.file_type || "" };
                break;
              case "file":
                c2 = { id: o2, type: "file", chatType: l2, from: n2.from, to: n2.to, ext: n2.ext, time: i2, url: (null == s2 ? void 0 : s2.url) || "", secret: s2.secret || "", file: {}, filename: s2.filename || "", length: s2.length || 0, file_length: s2.file_length || 0, filetype: n2.ext.file_type || "" };
                break;
              case "cmd":
                c2 = { id: o2, type: "cmd", chatType: l2, from: n2.from, to: n2.to, ext: n2.ext, time: i2, action: s2.action || "" };
                break;
              case "custom":
                c2 = { id: o2, type: "custom", chatType: l2, from: n2.from, to: n2.to, ext: n2.ext, time: i2, customEvent: s2.customEvent || "", customExts: s2.customExts || "" };
                break;
              default:
                G.error("unexpected message: ".concat(e3));
            }
            if (n2.msgConfig && (u2.msgConfig = n2.msgConfig), null == n2 ? void 0 : n2.meta) {
              var p2 = n2.meta;
              p2.thread && (u2.chatThread = { messageId: p2.thread.msg_parent_id, parentId: p2.thread.muc_parent_id, chatThreadName: p2.thread.thread_name }), p2.reactions && (u2.reactions = p2.reactions), p2.translations && (u2.translations = p2.translations);
            }
            return te(te({}, c2), u2);
          }
          var oe = function() {
            function e3(e4) {
              var t3 = e4.id;
              this.id = t3, this.type = e4.type;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, ackId: e4.id, type: "read", to: e4.to, from: e4.from || "", chatType: e4.chatType };
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType, ackId: e4.id, type: "read", to: e4.to, from: e4.from || "", ackContent: e4.ackContent, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), ne = function() {
            function e3(e4) {
              this.id = e4.id, this.type = e4.type;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, ackId: e4.ackId, type: "delivery", to: e4.to, from: e4.from || "" };
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), ackId: e4.ackId, type: "delivery", to: e4.to, from: e4.from || "", isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), ie = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id;
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "channel", to: e4.to, from: e4.from || "", time: Date.now() };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), type: "channel", chatType: e4.chatType || "singleChat", to: e4.to, from: e4.from || "", time: Date.now(), isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), ae = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id || $2.getUniqueId();
              this.id = r2, this.type = t3, this.value = "";
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "txt", to: e4.to, msg: e4.msg, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now(), isChatThread: e4.isChatThread }, this.value = e4.msg;
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              var t3, r2;
              return (null === (t3 = e4.msgConfig) || void 0 === t3 ? void 0 : t3.languages) && Array.isArray(null === (r2 = e4.msgConfig) || void 0 === r2 ? void 0 : r2.languages), { type: "txt", id: $2.getUniqueId(), msg: e4.msg, to: e4.to, from: e4.from || "", chatType: e4.chatType, ext: e4.ext, time: Date.now(), msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), se = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id;
              this.id = r2 || $2.getUniqueId(), this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "cmd", to: e4.to, action: e4.action, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now() };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), type: "cmd", to: e4.to, from: e4.from || "", chatType: e4.chatType || "singleChat", action: e4.action, time: Date.now(), ext: e4.ext, msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), ce = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id || $2.getUniqueId();
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "custom", to: e4.to, customEvent: e4.customEvent, customExts: e4.customExts, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now() };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType || "singleChat", type: "custom", to: e4.to, customEvent: e4.customEvent, customExts: e4.customExts, from: e4.from || "", ext: e4.ext, time: Date.now(), msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), ue = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id;
              this.id = r2 || $2.getUniqueId(), this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "loc", to: e4.to, addr: e4.addr, buildingName: e4.buildingName, lat: e4.lat, lng: e4.lng, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now() };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType || "singleChat", type: "loc", to: e4.to, addr: e4.addr, buildingName: e4.buildingName, lat: e4.lat, lng: e4.lng, from: e4.from || "", ext: e4.ext, time: Date.now(), msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), le = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id || $2.getUniqueId();
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              e4.file = e4.file || e4.fileInputId && $2.getFileUrl(e4.fileInputId), this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "img", file: e4.file, width: e4.width, height: e4.height, to: e4.to, from: e4.from || "", roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now(), onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, isChatThread: e4.isChatThread };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType, type: "img", url: e4.url, width: e4.width, height: e4.height, file: e4.file, to: e4.to, from: e4.from || "", ext: e4.ext, time: Date.now(), msgConfig: e4.msgConfig, file_length: e4.file_length, onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), pe = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id || $2.getUniqueId();
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              e4.file = e4.file || e4.fileInputId && $2.getFileUrl(e4.fileInputId), this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "audio", file: e4.file, filename: e4.filename, length: e4.length, file_length: e4.file_length, fileInputId: e4.fileInputId, to: e4.to, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now(), onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, isChatThread: e4.isChatThread };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType, type: "audio", filename: e4.filename, length: e4.length, file: e4.file, to: e4.to, from: e4.from || "", ext: e4.ext, time: Date.now(), onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, file_length: e4.file_length, msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), de = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id;
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              e4.file = e4.file || e4.fileInputId && $2.getFileUrl(e4.fileInputId), this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "video", file: e4.file, filename: e4.filename, length: e4.length, file_length: e4.file_length, fileInputId: e4.fileInputId, to: e4.to, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now(), apiUrl: e4.apiUrl, onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, isChatThread: e4.isChatThread };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType || "singleChat", type: "video", file: e4.file, filename: e4.filename, length: e4.length, file_length: e4.file_length, fileInputId: e4.fileInputId, to: e4.to, from: e4.from || "", ext: e4.ext, time: Date.now(), onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), he = function() {
            function e3(e4) {
              var t3 = e4.type, r2 = e4.id;
              this.id = r2, this.type = t3;
            }
            return e3.prototype.set = function(e4) {
              e4.file = e4.file || e4.fileInputId && $2.getFileUrl(e4.fileInputId), this.body = { id: this.id, chatType: e4.chatType || "singleChat", type: "file", file: e4.file, filename: e4.filename, fileInputId: e4.fileInputId, to: e4.to, from: e4.from, roomType: e4.roomType, success: e4.success, fail: e4.fail, ext: e4.ext, time: Date.now(), onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, isChatThread: e4.isChatThread };
            }, e3.prototype.setChatType = function(e4) {
              return !!this.body && (this.body.chatType = e4, true);
            }, e3.prototype.setGroup = function(e4) {
              return !!this.body && (this.body.group = e4, true);
            }, e3.create = function(e4) {
              return { id: $2.getUniqueId(), chatType: e4.chatType || "singleChat", type: "file", file: e4.file, filename: e4.filename, fileInputId: e4.fileInputId, file_length: e4.file_length, to: e4.to, from: e4.from || "", ext: e4.ext, onFileUploadError: e4.onFileUploadError, onFileUploadComplete: e4.onFileUploadComplete, onFileUploadProgress: e4.onFileUploadProgress, body: e4.body, time: Date.now(), msgConfig: e4.msgConfig, isChatThread: e4.isChatThread, priority: e4.priority, deliverOnlineOnly: e4.deliverOnlineOnly };
            }, e3;
          }(), fe = function() {
            function e3(t3, r2) {
              return this.type = t3, this.id = r2 || $2.getUniqueId(), e3.createOldMsg({ type: t3, id: this.id });
            }
            return e3.createOldMsg = function(e4) {
              switch (e4.type) {
                case "read":
                  return new oe({ type: "read", id: e4.id });
                case "delivery":
                  return new ne({ type: "delivery", id: e4.id });
                case "channel":
                  return new ie({ type: "channel", id: e4.id });
                case "txt":
                  return new ae({ type: "txt", id: e4.id });
                case "cmd":
                  return new se({ type: "cmd", id: e4.id });
                case "custom":
                  return new ce({ type: "custom", id: e4.id });
                case "loc":
                  return new ue({ type: "loc", id: e4.id });
                case "img":
                  return new le({ type: "img", id: e4.id });
                case "audio":
                  return new pe({ type: "audio", id: e4.id });
                case "video":
                  return new de({ type: "video", id: e4.id });
                case "file":
                  return new he({ type: "file", id: e4.id });
              }
            }, e3.create = function(e4) {
              return "txt" !== (t3 = e4).type || "version" in t3 ? function(e5) {
                return "img" === e5.type && !("version" in e5);
              }(e4) ? le.create(e4) : function(e5) {
                return "cmd" === e5.type && !("version" in e5);
              }(e4) ? se.create(e4) : function(e5) {
                return "file" === e5.type && !("version" in e5);
              }(e4) ? he.create(e4) : function(e5) {
                return "audio" === e5.type && !("version" in e5);
              }(e4) ? pe.create(e4) : function(e5) {
                return "video" === e5.type && !("version" in e5);
              }(e4) ? de.create(e4) : function(e5) {
                return "custom" === e5.type && !("version" in e5);
              }(e4) ? ce.create(e4) : function(e5) {
                return "loc" === e5.type && !("version" in e5);
              }(e4) ? ue.create(e4) : function(e5) {
                return "channel" === e5.type && !("version" in e5);
              }(e4) ? ie.create(e4) : function(e5) {
                return "delivery" === e5.type && !("version" in e5);
              }(e4) ? ne.create(e4) : function(e5) {
                return "read" === e5.type && !("version" in e5);
              }(e4) ? oe.create(e4) : {} : ae.create(e4);
              var t3;
            }, e3.prototype.set = function(e4) {
            }, e3;
          }(), me = { 0: "TEXT", 1: "IMAGE", 2: "VIDEO", 3: "LOCATION", 4: "VOICE", 5: "FILE", 6: "COMMAND", 7: "CUSTOM" };
          function ge(e3) {
            for (var t3 = {}, r2 = 0; r2 < e3.length; r2++)
              if (8 === e3[r2].type)
                t3[e3[r2].key] = JSON.parse(e3[r2].stringValue);
              else if (7 === e3[r2].type)
                t3[e3[r2].key] = e3[r2].stringValue;
              else if (6 === e3[r2].type)
                t3[e3[r2].key] = e3[r2].doubleValue;
              else if (5 === e3[r2].type)
                t3[e3[r2].key] = e3[r2].floatValue;
              else if (1 === e3[r2].type) {
                var o2 = e3[r2].varintValue, n2 = new (f())(o2.low, o2.high, o2.unsigned).toString();
                t3[e3[r2].key] = 0 !== Number(n2);
              } else
                2 !== e3[r2].type && 3 !== e3[r2].type && 4 !== e3[r2].type || (o2 = e3[r2].varintValue, n2 = new (f())(o2.low, o2.high, o2.unsigned).toString(), t3[e3[r2].key] = Number(n2));
            return t3;
          }
          function Ee(e3, t3, r2) {
            if (this.delivery && e3 !== t3) {
              var o2 = this.getUniqueId(), n2 = new fe("delivery", o2);
              n2.set({ ackId: r2, to: e3 }), G.debug("send delivery ack"), this.send(n2.body);
            }
          }
          var ye = function(e3, t3, r2, o2) {
            var n2, i2, a2, s2, c2, u2, l2, p2 = new (f())(e3.timestamp.low, e3.timestamp.high, e3.timestamp.unsigned).toString(), d2 = this.root.lookup("easemob.pb.MessageBody").decode(e3.payload), h2 = 1;
            if (e3.meta && e3.meta.length)
              switch ($2.parseNotify(e3.meta).is_online) {
                case 0:
                  h2 = 0;
                  break;
                case 1:
                  h2 = 1;
                  break;
                default:
                  h2 = 2;
              }
            else
              h2 = 3;
            var m2 = new (f())(e3.id.low, e3.id.high, e3.id.unsigned).toString(), g2 = d2.ackMessageId ? new (f())(d2.ackMessageId.low, d2.ackMessageId.high, d2.ackMessageId.unsigned).toString() : "", E2 = "", y2 = d2.from && d2.from.name, T2 = d2.to && d2.to.name;
            switch (G.debug("thirdMessage:", d2), d2.type) {
              case 1:
                E2 = "chat", "agoraToken" === this.grantType && (E2 = "singleChat"), this.delivery && Ee.call(this, y2, T2, m2);
                break;
              case 2:
                E2 = "groupchat", "agoraToken" === this.grantType && (E2 = "groupChat");
                break;
              case 3:
                E2 = "chatroom", "agoraToken" === this.grantType && (E2 = "chatRoom"), h2 = 1;
                break;
              case 4:
                E2 = "read_ack";
                var _2 = void 0;
                return d2.ext[0] && JSON.parse(d2.ext[0].stringValue) ? (_2 = { id: m2, type: "read", from: y2, to: T2, mid: g2, groupReadCount: d2.ext[0] && JSON.parse(d2.ext[0].stringValue), ackContent: d2.ackContent, onlineState: h2 }, this.onReadMessage && this.onReadMessage(_2), void (null === (n2 = this.eventHandler) || void 0 === n2 || n2.dispatch("onReadMessage", _2))) : (_2 = { id: m2, type: "read", from: y2, to: T2, mid: g2, onlineState: h2 }, this.onReadMessage && this.onReadMessage(_2), void (null === (i2 = this.eventHandler) || void 0 === i2 || i2.dispatch("onReadMessage", _2)));
              case 5:
                E2 = "deliver_ack", this.onDeliveredMessage && this.onDeliveredMessage({ id: m2, type: "delivery", from: y2, to: T2, mid: g2, onlineState: h2 });
                var v2 = { id: m2, type: "delivery", from: y2, to: T2, mid: g2, onlineState: h2 };
                return void (null === (a2 = this.eventHandler) || void 0 === a2 || a2.dispatch("onDeliveredMessage", v2));
              case 6:
                E2 = "recall";
                var O2 = { id: m2, from: y2 || "admin", to: T2, mid: g2, onlineState: h2 };
                return this.onRecallMessage && this.onRecallMessage(O2), void (null === (s2 = this.eventHandler) || void 0 === s2 || s2.dispatch("onRecallMessage", O2));
              case 7:
                this.onChannelMessage && this.onChannelMessage({ id: m2, type: "channel", chatType: "singleChat", from: y2, to: T2, time: Number(p2), onlineState: h2 });
                var R2 = { id: m2, type: "channel", chatType: "singleChat", from: y2, to: T2, time: Number(p2), onlineState: h2 };
                return void (null === (c2 = this.eventHandler) || void 0 === c2 || c2.dispatch("onChannelMessage", R2));
              default:
                return void G.error("unexpected message type: ".concat(d2.type));
            }
            var I2, S2 = "normal";
            if ("chat" === E2.toLowerCase() || "singleChat" === E2)
              I2 = "singleChat";
            else if ("groupchat" === E2.toLowerCase() || "groupChat" === E2)
              I2 = "groupChat";
            else if (I2 = "chatRoom", h2 = 1, e3.ext) {
              var C2 = ge([e3.ext]);
              S2 = 0 === C2.chatroom_msg_tag ? "high" : 2 === C2.chatroom_msg_tag ? "low" : "normal";
            }
            for (var N2 = 0; N2 < d2.contents.length; N2++) {
              var A2 = {}, M2 = {}, b2 = t3.errorCode > 0, U2 = t3.errorCode, w2 = t3.reason, k2 = d2.contents[N2], P2 = {}, L2 = [], D2 = [], x2 = null, B2 = null, H2 = void 0;
              if (d2.ext && (P2 = ge(d2.ext)), d2.meta && "string" == typeof d2.meta) {
                var j2 = JSON.parse(d2.meta);
                j2.reaction && (L2 = j2.reaction).forEach(function(e4) {
                  e4.isAddedBySelf = e4.state, delete e4.state;
                }), j2.translations && (D2 = j2.translations), j2.thread && "{}" !== JSON.stringify(j2.thread) && (x2 = { messageId: j2.thread.msg_parent_id, parentId: j2.thread.muc_parent_id, chatThreadName: j2.thread.thread_name }), j2.thread_overview && "{}" !== JSON.stringify(j2.thread_overview) && (B2 = { id: j2.thread_overview.id, parentId: j2.thread_overview.muc_parent_id, name: j2.thread_overview.name, lastMessage: re(j2.thread_overview.last_message), createTimestamp: j2.thread_overview.create_timestamp, updateTimestamp: j2.thread_overview.update_timestamp, messageCount: j2.thread_overview.message_count });
              }
              switch (k2.type) {
                case 0:
                  !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, data: k2.text, ext: P2, sourceMsg: k2.text, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onTextMessage && this.onTextMessage(A2);
                  var F2 = { id: m2, type: "txt", chatType: I2, msg: k2.text, to: T2, from: y2, ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (F2.msgConfig = A2.msgConfig), L2.length > 0 && (F2.reactions = L2), x2 && (F2.chatThread = x2), B2 && (F2.chatThreadOverview = B2), D2.length > 0 && (F2.translations = D2), "chatRoom" === I2 && (F2.priority = S2), M2 = F2, !r2 && this.eventHandler && this.eventHandler.dispatch("onTextMessage", F2);
                  break;
                case 1:
                  var W2 = (null === (u2 = null == k2 ? void 0 : k2.size) || void 0 === u2 ? void 0 : u2.width) || 0, q2 = (null === (l2 = null == k2 ? void 0 : k2.size) || void 0 === l2 ? void 0 : l2.height) || 0;
                  H2 = this.useOwnUploadFun ? k2.remotePath : (k2.remotePath && this.apiUrl + k2.remotePath.substr(k2.remotePath.indexOf("/", 9))) + "?em-redirect=true", k2.secretKey && !this.useOwnUploadFun && (H2 = "".concat(H2, "&share-secret=").concat(k2.secretKey)), !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, url: H2, secret: k2.secretKey, filename: k2.displayName, thumb: this.useOwnUploadFun ? "" : "".concat(H2, "&thumbnail=true"), thumb_secret: k2.secretKey, file_length: k2.fileLength || "", width: W2, height: q2, filetype: k2.filetype || "", accessToken: this.token, ext: P2, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).delay && delete A2.delay, !A2.msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onPictureMessage && this.onPictureMessage(A2);
                  var K2 = { id: m2, type: "img", chatType: I2, from: y2, to: T2, url: H2 || "", file: {}, width: W2, height: q2, secret: k2.secretKey || "", thumb: this.useOwnUploadFun ? "" : "".concat(H2, "&thumbnail=true"), thumb_secret: k2.secretKey, file_length: k2.fileLength || 0, ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (K2.msgConfig = A2.msgConfig), L2.length > 0 && (K2.reactions = L2), x2 && (K2.chatThread = x2), B2 && (K2.chatThreadOverview = B2), "chatRoom" === I2 && (K2.priority = S2), M2 = K2, !r2 && this.eventHandler && this.eventHandler.dispatch("onImageMessage", K2);
                  break;
                case 2:
                  H2 = this.useOwnUploadFun ? k2.remotePath : (k2.remotePath && this.apiUrl + k2.remotePath.substr(k2.remotePath.indexOf("/", 9))) + "?em-redirect=true", k2.secretKey && !this.useOwnUploadFun && (H2 = "".concat(H2, "&share-secret=").concat(k2.secretKey)), !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, url: H2, secret: k2.secretKey, filename: k2.displayName, length: k2.duration || "", file_length: k2.fileLength || "", filetype: k2.filetype || "", accessToken: this.token || "", ext: P2, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).delay && delete A2.delay, !A2.msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onVideoMessage && this.onVideoMessage(A2);
                  var V2 = { id: m2, type: "video", chatType: I2, from: y2, to: T2, url: H2, secret: k2.secretKey, filename: k2.displayName, length: k2.duration || 0, file: {}, file_length: k2.fileLength || 0, filetype: k2.filetype || "", accessToken: this.token || "", ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (V2.msgConfig = A2.msgConfig), L2.length > 0 && (V2.reactions = L2), x2 && (V2.chatThread = x2), B2 && (V2.chatThreadOverview = B2), "chatRoom" === I2 && (V2.priority = S2), M2 = V2, !r2 && this.eventHandler && this.eventHandler.dispatch("onVideoMessage", V2);
                  break;
                case 3:
                  !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, addr: k2.address, buildingName: k2.buildingName, lat: k2.latitude, lng: k2.longitude, ext: P2, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).delay && delete A2.delay, !A2.msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onLocationMessage && this.onLocationMessage(A2);
                  var z2 = { id: m2, type: "loc", chatType: I2, from: y2, to: T2, buildingName: k2.buildingName, addr: k2.address, lat: k2.latitude, lng: k2.longitude, ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (z2.msgConfig = A2.msgConfig), L2.length > 0 && (z2.reactions = L2), x2 && (z2.chatThread = x2), B2 && (z2.chatThreadOverview = B2), "chatRoom" === I2 && (z2.priority = S2), M2 = z2, !r2 && this.eventHandler && this.eventHandler.dispatch("onLocationMessage", z2);
                  break;
                case 4:
                  H2 = this.useOwnUploadFun ? k2.remotePath : (k2.remotePath && this.apiUrl + k2.remotePath.substr(k2.remotePath.indexOf("/", 9))) + "?em-redirect=true", k2.secretKey && !this.useOwnUploadFun && (H2 = "".concat(H2, "&share-secret=").concat(k2.secretKey)), !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, url: H2, secret: k2.secretKey, filename: k2.displayName, file_length: k2.fileLength || "", accessToken: this.token || "", ext: P2, length: k2.duration, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).delay && delete A2.delay, !A2.msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onAudioMessage && this.onAudioMessage(A2);
                  var J2 = { id: m2, type: "audio", chatType: I2, from: y2, to: T2, url: H2, secret: k2.secretKey, file: {}, filename: k2.displayName, length: k2.duration || 0, file_length: k2.fileLength || 0, filetype: k2.filetype || "", accessToken: this.token || "", ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (J2.msgConfig = A2.msgConfig), L2.length > 0 && (J2.reactions = L2), x2 && (J2.chatThread = x2), B2 && (J2.chatThreadOverview = B2), "chatRoom" === I2 && (J2.priority = S2), M2 = J2, !r2 && this.eventHandler && this.eventHandler.dispatch("onAudioMessage", J2);
                  break;
                case 5:
                  H2 = this.useOwnUploadFun ? k2.remotePath : (k2.remotePath && this.apiUrl + k2.remotePath.substr(k2.remotePath.indexOf("/", 9))) + "?em-redirect=true", k2.secretKey && !this.useOwnUploadFun && (H2 = "".concat(H2, "&share-secret=").concat(k2.secretKey)), !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, url: H2, secret: k2.secretKey, filename: k2.displayName, file_length: k2.fileLength, accessToken: this.token || "", ext: P2, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).delay && delete A2.delay, !A2.msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onFileMessage && this.onFileMessage(A2);
                  var X2 = { id: m2, type: "file", chatType: I2, from: y2, to: T2, url: H2, secret: k2.secretKey, file: {}, filename: k2.displayName, length: k2.duration || 0, file_length: k2.fileLength || 0, filetype: k2.filetype || "", accessToken: this.token || "", ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (X2.msgConfig = A2.msgConfig), L2.length > 0 && (X2.reactions = L2), x2 && (X2.chatThread = x2), B2 && (X2.chatThreadOverview = B2), "chatRoom" === I2 && (X2.priority = S2), M2 = X2, !r2 && this.eventHandler && this.eventHandler.dispatch("onFileMessage", X2);
                  break;
                case 6:
                  !(A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, action: k2.action, ext: P2, time: p2, msgConfig: d2.msgConfig, onlineState: h2 }).msgConfig && delete d2.msgConfig, A2.error = b2, A2.errorText = w2, A2.errorCode = U2, !r2 && this.onCmdMessage && this.onCmdMessage(A2);
                  var Y2 = { id: m2, type: "cmd", chatType: I2, from: y2, to: T2, action: k2.action, ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (Y2.msgConfig = A2.msgConfig), L2.length > 0 && (Y2.reactions = L2), x2 && (Y2.chatThread = x2), B2 && (Y2.chatThreadOverview = B2), "chatRoom" === I2 && (Y2.priority = S2), M2 = Y2, !r2 && this.eventHandler && this.eventHandler.dispatch("onCmdMessage", Y2);
                  break;
                case 7:
                  var Q2 = {}, Z2 = {};
                  d2.contents[0].customExts && (Q2 = ge(d2.contents[0].customExts)), d2.contents[0].params && (Z2 = ge(d2.contents[0].params)), A2 = { id: m2, type: E2, contentsType: me[k2.type], from: y2, to: T2, customEvent: k2.customEvent, params: Z2, customExts: Q2, ext: P2, time: p2, onlineState: h2 }, !r2 && this.onCustomMessage && this.onCustomMessage(A2);
                  var ee2 = { id: m2, type: "custom", chatType: I2, from: y2, to: T2, customEvent: k2.customEvent, params: Z2, customExts: Q2, ext: P2, time: Number(p2), onlineState: h2 };
                  A2.msgConfig && (ee2.msgConfig = A2.msgConfig), L2.length > 0 && (ee2.reactions = L2), x2 && (ee2.chatThread = x2), B2 && (ee2.chatThreadOverview = B2), "chatRoom" === I2 && (ee2.priority = S2), M2 = ee2, !r2 && this.eventHandler && this.eventHandler.dispatch("onCustomMessage", ee2);
                  break;
                default:
                  G.error("Unknow message type, message:", k2);
              }
              return o2 ? M2 : A2;
            }
          }, Te = ["public", "members_only", "allow_user_invites", "invite_need_confirm"], _e = { name: "name", title: "name", description: "description", public: "public", members_only: "approval", allow_user_invites: "allowInvites", max_users: "maxUsers", invite_need_confirm: "inviteNeedConfirm", custom: "ext", last_modified: "lastModified" };
          function ve(e3, t3) {
            var r2, o2, n2, i2, a2, s2, c2 = this, u2 = this.context, l2 = u2.userId, p2 = u2.jid, d2 = t3.from.name === l2 && p2.clientResource !== t3.from.clientResource;
            return t3.isThread ? (n2 = { id: t3.mucId.name, name: t3.mucName, operation: "", parentId: t3.mucParentId.name, operator: t3.from.name, userName: t3.to.length ? t3.to[0].name : "" }, i2 = { chatThreadId: t3.mucId.name, chatThreadName: t3.mucName, operation: "", parentId: t3.mucParentId.name }) : (o2 = { type: "", owner: t3.from.name, gid: t3.mucId.name, from: t3.from.name, fromJid: t3.from, to: t3.to.length ? t3.to[0].name : "", toJid: t3.to, chatroom: t3.isChatroom, status: t3.status }, a2 = { operation: "", id: t3.mucId.name, from: t3.from.name }, t3.isChatroom && (null === (r2 = null == t3 ? void 0 : t3.eventInfo) || void 0 === r2 ? void 0 : r2.ext) && (s2 = JSON.parse(t3.eventInfo.ext))), ({ 45: function() {
              var e4, r3, o3;
              a2.operation = "memberAttributesUpdate";
              var n3 = JSON.parse(null === (e4 = null == t3 ? void 0 : t3.eventInfo) || void 0 === e4 ? void 0 : e4.ext) || {};
              a2.attributes = n3.properties || {}, a2.userId = n3.username || "", d2 ? null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onMultiDeviceEvent", a2) : null === (o3 = c2.eventHandler) || void 0 === o3 || o3.dispatch("onGroupEvent", a2);
            }, 44: function() {
              var e4;
              a2.operation = "removeChatRoomAttributes", a2.attributes = s2.result.successKeys, s2.result.successKeys.length > 0 && (null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomEvent", a2));
            }, 43: function() {
              var e4;
              a2.operation = "updateChatRoomAttributes";
              var t4 = {};
              s2.result.successKeys.forEach(function(e5) {
                t4[e5] = s2.properties[e5];
              }), a2.attributes = t4, s2.result.successKeys.length > 0 && (null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomEvent", a2));
            }, 42: function() {
            }, 41: function() {
            }, 40: function() {
            }, 39: function() {
            }, 38: function() {
              var e4;
              i2.operation = "chatThreadNameUpdate", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onMultiDeviceEvent", i2);
            }, 37: function() {
              var e4;
              n2.operation = "userRemove", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatThreadChange", n2);
            }, 36: function() {
              var e4;
              i2.operation = "chatThreadLeave", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onMultiDeviceEvent", i2);
            }, 35: function() {
              var e4;
              i2.operation = "chatThreadJoin", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onMultiDeviceEvent", i2);
            }, 34: function() {
              var e4;
              i2.operation = "chatThreadDestroy", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onMultiDeviceEvent", i2);
            }, 33: function() {
              var e4;
              i2.operation = "chatThreadCreate", null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onMultiDeviceEvent", i2);
            }, 32: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "rmChatRoomMute" : "rmGroupMute", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "unmuteAllMembers", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 31: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "muteChatRoom" : "muteGroup", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "muteAllMembers", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 30: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "rmUserFromChatRoomWhiteList" : "rmUserFromGroupWhiteList", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "removeAllowlistMember", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 29: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "addUserToChatRoomWhiteList" : "addUserToGroupWhiteList", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "addUserToAllowlist", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 28: function() {
              var e4, r3, n3, i3;
              o2.type = "deleteFile", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "deleteFile", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 27: function() {
              var e4, r3, n3, i3;
              o2.type = "uploadFile", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "uploadFile", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 26: function() {
              var e4, r3, n3, i3;
              o2.type = "deleteAnnouncement", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "deleteAnnouncement", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 25: function() {
              var e4, r3, n3, i3;
              o2.type = "updateAnnouncement", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "updateAnnouncement", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 24: function() {
              var e4, r3, n3, i3;
              o2.type = "removeMute", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "unmuteMember", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 23: function() {
              var e4, r3, n3, i3;
              o2.type = "addMute", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "muteMember", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 22: function() {
              var e4, r3, n3, i3;
              o2.type = "removeAdmin", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "removeAdmin", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 21: function() {
              var e4, r3, n3, i3;
              o2.type = "addAdmin", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "setAdmin", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 20: function() {
              var e4, r3, n3, i3;
              o2.type = "changeOwner", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "changeOwner", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 19: function() {
              var e4, r3, n3, i3;
              o2.type = "direct_joined", o2.groupName = t3.mucName, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "directJoined", a2.name = t3.mucName, t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 18: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "leaveChatRoom" : "leaveGroup", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "memberAbsence", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 17: function() {
              var e4, r3, n3, i3;
              o2.type = t3.isChatroom ? "memberJoinChatRoomSuccess" : "memberJoinPublicGroupSuccess", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "memberPresence", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 16: function() {
              var e4, r3;
              o2.type = "unblock", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 15: function() {
              var e4, r3;
              o2.type = "block", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 14: function() {
              var e4, r3, n3, i3, s3, u3 = t3.isChatroom;
              if (!u3) {
                var l3 = JSON.parse((null === (e4 = null == t3 ? void 0 : t3.eventInfo) || void 0 === e4 ? void 0 : e4.ext) || "{}", function(e5, t4) {
                  return "last_modified" === e5 ? Number(t4) : Te.includes(e5) ? "true" === t4 || true === t4 : t4;
                });
                a2.detail = o2.detail = {}, Object.keys(l3).forEach(function(e5) {
                  var t4 = _e[e5];
                  if (t4) {
                    var r4 = l3[e5];
                    a2.detail && (a2.detail[t4] = r4), o2.detail && (o2.detail[t4] = r4);
                  }
                });
              }
              o2.type = "update", c2.onPresence && c2.onPresence(o2), u3 ? null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onChatroomChange", o2) : null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onGroupChange", o2), a2.operation = "updateInfo", u3 ? null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onChatroomEvent", a2) : null === (s3 = c2.eventHandler) || void 0 === s3 || s3.dispatch("onGroupEvent", a2);
            }, 13: function() {
              var e4, r3, n3, i3;
              o2.type = "allow", o2.reason = t3.reason, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "unblockMember", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 12: function() {
              var e4, r3;
              o2.type = "ban", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 11: function() {
              var e4, r3;
              o2.type = "getBlackList", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 10: function() {
              var e4, r3, n3, i3;
              o2.type = "removedFromGroup", o2.kicked = o2.to, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "removeMember", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 9: function() {
              var e4, r3, n3, i3;
              o2.type = "invite_decline", o2.kicked = o2.to, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "rejectInvite", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 8: function() {
              var e4, r3, n3, i3;
              o2.type = "invite_accept", o2.kicked = o2.to, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "acceptInvite", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 7: function() {
              var e4, r3, n3, i3;
              o2.type = "invite", o2.kicked = o2.to, o2.groupName = t3.mucName, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "inviteToJoin", a2.name = t3.mucName, t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 6: function() {
              var e4, r3, n3, i3;
              o2.type = "joinPublicGroupDeclined", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "joinPublicGroupDeclined", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 5: function() {
              var e4, r3, n3, i3;
              o2.type = "joinPublicGroupSuccess", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "acceptRequest", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 4: function() {
              var e4, r3, n3, i3;
              o2.type = "joinGroupNotifications", o2.reason = t3.reason, c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "requestToJoin", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 3: function() {
              var e4, r3;
              o2.type = "leave", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 2: function() {
              var e4, r3;
              o2.type = "join", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2);
            }, 1: function() {
              var e4, r3, n3, i3;
              o2.type = "deleteGroupChat", c2.onPresence && c2.onPresence(o2), t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomChange", o2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupChange", o2), a2.operation = "destroy", t3.isChatroom ? null === (n3 = c2.eventHandler) || void 0 === n3 || n3.dispatch("onChatroomEvent", a2) : null === (i3 = c2.eventHandler) || void 0 === i3 || i3.dispatch("onGroupEvent", a2);
            }, 0: function() {
              var e4, r3;
              a2.operation = "create", t3.isChatroom ? null === (e4 = c2.eventHandler) || void 0 === e4 || e4.dispatch("onChatroomEvent", a2) : null === (r3 = c2.eventHandler) || void 0 === r3 || r3.dispatch("onGroupEvent", a2);
            } }[e3] || function() {
              console.error("No match operation ".concat(e3));
            })();
          }
          var Oe, Re = function(e3) {
            var t3 = this.root.lookup("easemob.pb.MUCBody").decode(e3.payload), r2 = t3.operation;
            G.debug("onMucMessage", t3), ve.call(this, r2, t3);
          };
          !function(e3) {
            e3[e3.Add = 2] = "Add", e3[e3.Remove = 3] = "Remove", e3[e3.Accept = 4] = "Accept", e3[e3.Decline = 5] = "Decline", e3[e3.Ban = 6] = "Ban", e3[e3.Allow = 7] = "Allow";
          }(Oe || (Oe = {}));
          var Ie = { operatRoster: function(e3, t3) {
            var r2 = [], o2 = this.root.lookup("easemob.pb.RosterBody"), n2 = o2.decode(r2);
            switch (t3) {
              case "add":
                n2.operation = Oe.Add;
                break;
              case "remove":
                n2.operation = Oe.Remove;
                break;
              case "accept":
                n2.operation = Oe.Accept;
                break;
              case "decline":
                n2.operation = Oe.Decline;
                break;
              case "ban":
                n2.operation = Oe.Ban;
                break;
              case "allow":
                n2.operation = Oe.Allow;
                break;
              default:
                G.error("operatRoster:", t3);
            }
            n2.from = this.context.jid;
            var i2 = [];
            if ("string" == typeof e3.to)
              i2.push({ appKey: this.appKey || this.context.appKey, name: e3.to, domain: "easemob.com" });
            else if (e3.to instanceof Array)
              for (var a2 = 0; a2 < e3.to.length; a2++)
                i2.push({ appKey: this.appKey, name: e3.to[a2], domain: "easemob.com" });
            n2.to = i2, n2.reason = e3.message || "", n2 = o2.encode(n2).finish();
            var s2 = this.root.lookup("easemob.pb.Meta").decode(r2);
            s2.id = e3.id || this.getUniqueId();
            var c2 = this.dataReport.geOperateFun({ operationName: E[t3] });
            R.size <= S && R.set(s2.id, { rpt: c2, requestName: E[t3] }), s2.from = this.context.jid, s2.to = { domain: "@easemob.com" }, s2.ns = 3, s2.payload = n2;
            var u2 = this.root.lookup("easemob.pb.CommSyncUL"), l2 = u2.decode(r2);
            l2.meta = s2, l2 = u2.encode(l2).finish();
            var p2 = this.root.lookup("easemob.pb.MSync"), d2 = p2.decode(r2);
            if (d2.version = this.version, d2.encryptType = [0], d2.command = 0, d2.guid = this.jid, d2.payload = l2, d2 = p2.encode(d2).finish(), "miniCore" === this.name)
              this.sock.send(d2);
            else {
              var h2 = this.mSync.base64transform(d2);
              this.sock.send(h2);
            }
          }, handleRosterMsg: function(e3) {
            var t3, r2, o2, n2, i2, a2, s2 = this.root.lookup("easemob.pb.RosterBody").decode(e3.payload), c2 = { type: "", to: s2.to[0].name, from: s2.from.name, status: s2.reason };
            switch (s2.operation) {
              case 2:
                c2.type = "subscribe", this.onContactInvited && this.onContactInvited(c2), null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onContactInvited", c2);
                break;
              case 3:
                c2.type = "unsubscribed", this.onContactDeleted && this.onContactDeleted(c2), null === (r2 = this.eventHandler) || void 0 === r2 || r2.dispatch("onContactDeleted", c2);
                break;
              case 4:
                c2.type = "subscribed", this.onContactAdded && this.onContactAdded(c2), null === (o2 = this.eventHandler) || void 0 === o2 || o2.dispatch("onContactAdded", c2);
                break;
              case 5:
                c2.type = "unsubscribed", this.onContactRefuse && this.onContactRefuse(c2), null === (n2 = this.eventHandler) || void 0 === n2 || n2.dispatch("onContactRefuse", c2);
                break;
              case 6:
              case 7:
                break;
              case 8:
                c2.type = "subscribed", this.onContactAgreed && this.onContactAgreed(c2), null === (i2 = this.eventHandler) || void 0 === i2 || i2.dispatch("onContactAgreed", c2);
                break;
              case 9:
                c2.type = "unsubscribed", this.onContactRefuse && this.onContactRefuse(c2), null === (a2 = this.eventHandler) || void 0 === a2 || a2.dispatch("onContactRefuse", c2);
                break;
              default:
                G.error("handleRosterMsg:", s2);
            }
            this.onPresence && c2.type && this.onPresence(c2);
          } }, Se = function(e3) {
            var t3, r2, o2, n2, i2, a2, s2 = this.root.lookup("easemob.pb.StatisticsBody").decode(e3.payload);
            switch (s2.operation) {
              case 0:
                this.onStatisticMessage && this.onStatisticMessage(s2), null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onStatisticMessage", s2);
                break;
              case 1:
                a2 = m.create({ type: p.WEBIM_CONNCTION_USER_REMOVED, message: "user has been removed" }), this.logOut = true, this.onError && this.onError(a2), null === (r2 = this.eventHandler) || void 0 === r2 || r2.dispatch("onError", a2);
                break;
              case 2:
                a2 = m.create({ type: p.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE, message: "the user is already logged on another device" }), this.logOut = true, this.onError && this.onError(a2), null === (o2 = this.eventHandler) || void 0 === o2 || o2.dispatch("onError", a2);
                break;
              case 3:
                a2 = m.create({ type: p.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD, message: "the user was kicked by changing password" }), this.logOut = true, this.onError && this.onError(a2), null === (n2 = this.eventHandler) || void 0 === n2 || n2.dispatch("onError", a2);
                break;
              case 4:
                a2 = m.create({ type: p.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE, message: "the user was kicked by other device" }), this.logOut = true, this.onError && this.onError(a2), null === (i2 = this.eventHandler) || void 0 === i2 || i2.dispatch("onError", a2);
                break;
              default:
                G.error("handleStatisticsMsg:", s2);
            }
          };
          function Ce(e3) {
            var t3, r2 = [], o2 = [], n2 = e3.data;
            n2 && n2.values && n2.values.forEach(function(e4) {
              Object.entries(e4.status).forEach(function(e5) {
                o2.push({ device: e5[0], status: Number(e5[1]) });
              }), r2.push({ userId: e4.uid, lastTime: Number(e4.last_time), expire: Number(e4.expiry), ext: e4.ext, statusDetails: o2 });
            }), this.onPresenceStatusChange && this.onPresenceStatusChange(r2), null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onPresenceStatusChange", r2);
          }
          function Ne(e3) {
            var t3 = this;
            e3.data.forEach(function(e4) {
              var r2, o2 = { from: e4.from, to: e4.to, chatType: "chat" === e4.channel_type ? "singleChat" : "groupChat", messageId: e4.messageId, reactions: e4.reactions, ts: e4.ts };
              null === (r2 = t3.eventHandler) || void 0 === r2 || r2.dispatch("onReactionChange", o2);
            });
          }
          function Ae(e3) {
            var t3, r2, o2, n2;
            if (e3.data) {
              var i2 = e3.data, a2 = { id: i2.id || "", name: i2.name || "", parentId: i2.muc_parent_id || "", messageId: i2.msg_parent_id || "", timestamp: i2.timestamp || 0, operator: i2.from || "", operation: "" };
              switch (i2.operation) {
                case "create":
                  a2.operation = "create", a2.createTimestamp = a2.timestamp, a2.messageCount = 0, null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onChatThreadChange", a2);
                  break;
                case "update_msg":
                  a2.operation = "update", a2.messageCount = i2.message_count, i2.last_message && "{}" !== JSON.stringify(i2.last_message) ? a2.lastMessage = re(i2.last_message) : "{}" === JSON.stringify(i2.last_message) && (a2.lastMessage = {}), null === (r2 = this.eventHandler) || void 0 === r2 || r2.dispatch("onChatThreadChange", a2);
                  break;
                case "update":
                  a2.operation = "update", a2.messageCount = i2.message_count, null === (o2 = this.eventHandler) || void 0 === o2 || o2.dispatch("onChatThreadChange", a2);
                  break;
                case "delete":
                  a2.operation = "destroy", null === (n2 = this.eventHandler) || void 0 === n2 || n2.dispatch("onChatThreadChange", a2);
              }
            }
          }
          function Me(e3) {
            var t3, r2 = e3.data;
            if (r2.resource !== this.clientResource) {
              var o2 = { operation: "deleteRoaming", conversationId: r2.to, chatType: "chat" === r2.chatType ? "singleChat" : "groupChat", resource: r2.resource };
              null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onMultiDeviceEvent", o2);
            }
          }
          var be = function(e3) {
            var t3 = $2.parseNotify(e3.payload);
            switch (e3.from.name, e3.to.name, t3.type) {
              case "presence":
                Ce.call(this, t3);
                break;
              case "reaction":
                Ne.call(this, t3);
                break;
              case "thread":
                Ae.call(this, t3);
                break;
              case "roaming_delete":
                Me.call(this, t3);
                break;
              default:
                G.error("unexpected notify type: ".concat(t3.type));
            }
          }, Ue = function() {
            return Ue = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, Ue.apply(this, arguments);
          }, we = $2.getEnvInfo();
          function ke() {
            var e3 = "webim", t3 = "", r2 = "", o2 = [], n2 = new Date().valueOf();
            "webim" === this.deviceId ? (r2 = "random_" + n2.toString(), e3 = this.deviceId + "_" + r2, t3 = this.deviceId) : e3 = t3 = r2 = "webim_" + this.deviceId, this.context.jid && (this.context.jid.clientResource = e3);
            var i2 = this.root.lookup("easemob.pb.Provision"), a2 = i2.decode(o2);
            a2.compressType = this.compressType, a2.encryptType = this.encryptType, a2.osType = this.osType, a2.version = this.version, a2.deviceName = t3, a2.resource = e3, a2.deviceUuid = r2, a2.auth = "$t$" + this.token, a2.actionVersion = "v2.0", a2 = i2.encode(a2).finish();
            var s2 = this.root.lookup("easemob.pb.MSync"), c2 = s2.decode(o2);
            return c2.version = this.version, c2.guid = this.context.jid, c2.auth = "$t$" + this.token, c2.command = 3, c2.deviceId = t3, c2.serviceId = this.dataReport.getServiceId(), c2.encryptType = this.encryptType, c2.payload = a2, s2.encode(c2).finish();
          }
          function Pe(e3, t3) {
            var r2 = this, o2 = $2.getEnvInfo();
            if ("web" === o2.platform || "zfb" === o2.platform || "dd" === o2.platform) {
              for (var n2 = "", i2 = 0; i2 < e3.length; i2++)
                n2 += String.fromCharCode(e3[i2]);
              return n2 = ee().btoa(n2), "web" === o2.platform ? n2 : { data: n2, isBuffer: false, complete: function() {
              }, fail: function(e4) {
                "sendSocketMessage:fail taskID not exist" !== e4.errMsg && "SocketTast.send:fail SocketTask.readyState is not OPEN" !== e4.errMsg || (G.debug("send message fail and reconnect"), r2.reconnecting || r2.reconnect()), t3 && r2._msgHash && r2._msgHash[t3] && r2._msgHash[t3].fail({ id: t3 });
              } };
            }
            var a2 = e3;
            return { data: a2.buffer.slice(a2.byteOffset, a2.byteOffset + a2.byteLength), fail: function(e4) {
              "sendSocketMessage:fail taskID not exist" !== e4.errMsg && "SocketTast.send:fail SocketTask.readyState is not OPEN" !== e4.errMsg || r2.reconnecting || r2.reconnect(), t3 && r2._msgHash && r2._msgHash[t3] && r2._msgHash[t3].fail({ id: t3 });
            } };
          }
          function Le(e3, t3) {
            switch (e3.ns) {
              case 0:
                Se.call(this, e3);
                break;
              case 1:
                ye.call(this, e3, t3);
                break;
              case 2:
                Re.call(this, e3);
                break;
              case 3:
                Ie.handleRosterMsg.call(this, e3);
                break;
              case 4:
                this.registerConfrIQHandler && this.registerConfrIQHandler(e3, t3, this);
                break;
              case 5:
                be.call(this, e3);
                break;
              default:
                G.error("distributeMeta", e3);
            }
          }
          function De(e3, t3) {
            for (var r2 = function(r3) {
              var n3 = new (f())(e3[r3].id.low, e3[r3].id.high, e3[r3].id.unsigned).toString();
              if (o2._load_msg_cache.some(function(e4) {
                return e4.msgId === n3;
              }))
                return "continue";
              var i2 = e3[r3].from.name, a2 = e3[r3].to ? e3[r3].to.name : "", s2 = !!e3[r3].to && -1 !== e3[r3].to.domain.indexOf("conference");
              o2._load_msg_cache.length <= o2.max_cache_length || o2._load_msg_cache.shift(), o2._load_msg_cache.push({ msgId: n3, from: i2, to: a2, isGroup: s2 }), Le.call(o2, e3[r3], t3);
            }, o2 = this, n2 = 0; n2 < e3.length; n2++)
              r2(n2);
          }
          function Ge(e3) {
            var t3 = this.root.lookup("easemob.pb.CommUnreadDL");
            if (t3 = t3.decode(e3.payload), "agoraToken" === this.grantType) {
              var r2 = new (f())(t3.timestamp.low, t3.timestamp.high, t3.timestamp.unsigned).toString();
              this.compareTokenExpireTime(Number(r2), this.expirationTime);
            }
            if (0 === t3.unread.length)
              Ke.call(this);
            else
              for (var o2 = 0; o2 < t3.unread.length; o2++)
                He.call(this, t3.unread[o2].queue);
          }
          function xe() {
            var e3 = [], t3 = this.root.lookup("easemob.pb.StatisticsBody"), r2 = t3.decode(e3);
            r2.operation = 0, r2 = t3.encode(r2).finish();
            var o2 = this.root.lookup("easemob.pb.Meta").decode(e3);
            o2.id = new Date().valueOf(), o2.ns = 0, o2.payload = r2;
            var n2 = this.root.lookup("easemob.pb.CommSyncUL"), i2 = n2.decode(e3);
            i2.meta = o2, i2 = n2.encode(i2).finish();
            var a2 = this.root.lookup("easemob.pb.MSync"), s2 = a2.decode(e3);
            return s2.version = this.version, s2.encryptType = [0], s2.command = 0, s2.payload = i2, a2.encode(s2).finish();
          }
          function Be(e3) {
            var t3 = [], r2 = this.root.lookup("easemob.pb.CommSyncUL"), o2 = r2.decode(t3);
            o2.queue = e3, o2 = r2.encode(o2).finish();
            var n2 = this.root.lookup("easemob.pb.MSync"), i2 = n2.decode(t3);
            return i2.version = this.version, i2.encryptType = this.encryptType, i2.command = 0, i2.payload = o2, n2.encode(i2).finish();
          }
          function He(e3) {
            G.debug("sendBackqueue");
            var t3 = Be.call(this, e3);
            ut.call(this, t3);
          }
          function je(e3, t3) {
            var r2 = [], o2 = this.root.lookup("easemob.pb.CommSyncUL"), n2 = o2.decode(r2);
            n2.queue = t3, n2.key = new (f())(e3.low, e3.high, e3.unsigned).toString(), n2 = o2.encode(n2).finish();
            var i2 = this.root.lookup("easemob.pb.MSync"), a2 = i2.decode(r2);
            return a2.version = this.version, a2.encryptType = this.encryptType, a2.command = 0, a2.payload = n2, i2.encode(a2).finish();
          }
          function Fe(e3, t3) {
            G.debug("sendLastSession");
            var r2 = je.call(this, e3, t3);
            ut.call(this, r2);
          }
          function We(e3) {
            var t3, r2 = this.root.lookup("easemob.pb.Provision").decode(e3.payload);
            if (this.context.jid && (this.context.jid.clientResource = r2.resource), this.clientResource = r2.resource, 0 === r2.status.errorCode) {
              if (this.reconnecting = false, this.logOut = false, "zfb" !== we.platform && "dd" !== we.platform || (this.sock.readyState = 1), this.onOpened && this.onOpened(), null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onConnected"), "agoraToken" === this.grantType) {
                var o2 = Date.now();
                this.expiresIn = this.expirationTime - o2, this.tokenExpireTimeCountDown(this.expiresIn);
              }
              qe.call(this), ze.call(this), Ve.call(this), Ke.call(this);
            }
          }
          function qe() {
            if (this.unSendMsgArr.length > 0) {
              for (var e3 = 0; e3 < this.unSendMsgArr.length; e3++) {
                var t3 = this.unSendMsgArr[e3];
                ct.call(this, t3);
              }
              this.unSendMsgArr = [];
            }
          }
          function Ke() {
            var e3 = xe.call(this);
            ut.call(this, e3);
          }
          function Ve() {
            var e3 = Xe.call(this);
            ut.call(this, e3);
          }
          function ze() {
            var e3 = this;
            Je.call(this), this.heartBeatID = setInterval(function() {
              Ve.call(e3);
            }, this.heartBeatWait);
          }
          function Je() {
            clearInterval(this.heartBeatID);
          }
          function Xe() {
            var e3 = this.root.lookup("easemob.pb.MSync"), t3 = e3.decode([]);
            return t3.version = this.version, t3.encryptType = this.encryptType, t3.command = 1, e3.encode(t3).finish();
          }
          function Ye(e3, t3) {
            return e3.some(function(e4) {
              return e4.name === t3.name;
            });
          }
          function Qe(e3) {
            var t3 = this, r2 = this.root.lookup("easemob.pb.CommNotice").decode(e3.payload);
            Ye(this._queues, r2.queue) || this.clientResource === r2.queue.clientResource && r2.queue.name === this.context.userId || (this._queues.push(r2.queue), this.qTimer && clearTimeout(this.qTimer), this.qTimer = setTimeout(function() {
              var e4 = r2.queue;
              Ye(t3._queues, e4) && (He.call(t3, r2.queue), G.debug("⬇q:", e4));
            }, 1e4), 1 === this._queues.length && He.call(this, r2.queue));
          }
          function $e(e3) {
            if ("string" == typeof e3) {
              var t3 = JSON.parse(e3);
              if (Array.isArray(t3)) {
                var r2 = t3[0], o2 = t3[1];
                this.closeInfo = { code: r2, reason: o2 };
              }
            }
          }
          function Ze(e3) {
            return t3 = this, r2 = void 0, n2 = function() {
              var t4, r3, o3, n3, i2, a2, s2, c2;
              return function(e4, t5) {
                var r4, o4, n4, i3, a3 = { label: 0, sent: function() {
                  if (1 & n4[0])
                    throw n4[1];
                  return n4[1];
                }, trys: [], ops: [] };
                return i3 = { next: s3(0), throw: s3(1), return: s3(2) }, "function" == typeof Symbol && (i3[Symbol.iterator] = function() {
                  return this;
                }), i3;
                function s3(i4) {
                  return function(s4) {
                    return function(i5) {
                      if (r4)
                        throw new TypeError("Generator is already executing.");
                      for (; a3; )
                        try {
                          if (r4 = 1, o4 && (n4 = 2 & i5[0] ? o4.return : i5[0] ? o4.throw || ((n4 = o4.return) && n4.call(o4), 0) : o4.next) && !(n4 = n4.call(o4, i5[1])).done)
                            return n4;
                          switch (o4 = 0, n4 && (i5 = [2 & i5[0], n4.value]), i5[0]) {
                            case 0:
                            case 1:
                              n4 = i5;
                              break;
                            case 4:
                              return a3.label++, { value: i5[1], done: false };
                            case 5:
                              a3.label++, o4 = i5[1], i5 = [0];
                              continue;
                            case 7:
                              i5 = a3.ops.pop(), a3.trys.pop();
                              continue;
                            default:
                              if (!((n4 = (n4 = a3.trys).length > 0 && n4[n4.length - 1]) || 6 !== i5[0] && 2 !== i5[0])) {
                                a3 = 0;
                                continue;
                              }
                              if (3 === i5[0] && (!n4 || i5[1] > n4[0] && i5[1] < n4[3])) {
                                a3.label = i5[1];
                                break;
                              }
                              if (6 === i5[0] && a3.label < n4[1]) {
                                a3.label = n4[1], n4 = i5;
                                break;
                              }
                              if (n4 && a3.label < n4[2]) {
                                a3.label = n4[2], a3.ops.push(i5);
                                break;
                              }
                              n4[2] && a3.ops.pop(), a3.trys.pop();
                              continue;
                          }
                          i5 = t5.call(e4, a3);
                        } catch (e5) {
                          i5 = [6, e5], o4 = 0;
                        } finally {
                          r4 = n4 = 0;
                        }
                      if (5 & i5[0])
                        throw i5[1];
                      return { value: i5[0] ? i5[1] : void 0, done: true };
                    }([i4, s4]);
                  };
                }
              }(this, function(u2) {
                if (t4 = $2.getEnvInfo(), r3 = this.root.lookup("easemob.pb.MSync"), "miniCore" === this.name) {
                  try {
                    e3.data instanceof ArrayBuffer || (G.debug("received message: ".concat(e3.data)), $e.call(this, e3.data)), n3 = new Uint8Array(e3.data), o3 = r3.decode(n3);
                  } catch (e4) {
                    throw new Error("decode message fail.");
                  }
                  return [2, o3];
                }
                if ("web" === t4.platform || "zfb" === t4.platform || "dd" === t4.platform) {
                  for ('[401,"normal closed"]' === e3.data && (G.debug("received message: ".concat(e3.data)), $e.call(this, e3.data)), i2 = ee().atob(e3.data), a2 = [], s2 = 0, c2 = i2.length; s2 < c2; ++s2)
                    a2.push(i2.charCodeAt(s2));
                  return [2, r3.decode(a2)];
                }
                try {
                  e3.data instanceof ArrayBuffer || (G.debug("received message: ".concat(e3.data)), $e.call(this, e3.data)), o3 = r3.decode(e3.data);
                } catch (e4) {
                  throw new Error("decode message fail.");
                }
                return [2, o3];
              });
            }, new ((o2 = void 0) || (o2 = Promise))(function(e4, i2) {
              function a2(e5) {
                try {
                  c2(n2.next(e5));
                } catch (e6) {
                  i2(e6);
                }
              }
              function s2(e5) {
                try {
                  c2(n2.throw(e5));
                } catch (e6) {
                  i2(e6);
                }
              }
              function c2(t4) {
                var r3;
                t4.done ? e4(t4.value) : (r3 = t4.value, r3 instanceof o2 ? r3 : new o2(function(e5) {
                  e5(r3);
                })).then(a2, s2);
              }
              c2((n2 = n2.apply(t3, r2 || [])).next());
            });
            var t3, r2, o2, n2;
          }
          function et(e3) {
            var t3 = this;
            e3.then(function(e4) {
              if (e4)
                switch (e4.command) {
                  case 0:
                    rt.call(t3, e4);
                    break;
                  case 1:
                    Ge.call(t3, e4);
                    break;
                  case 2:
                    Qe.call(t3, e4);
                    break;
                  case 3:
                    We.call(t3, e4);
                    break;
                  default:
                    G.error("unexpected msync command: ".concat(e4.command));
                }
              else
                G.error("unexpected msync result: ".concat(e4));
            });
          }
          function rt(e3) {
            var t3, r2, o2, n2, i2, a2, s2, c2, u2, l2, d2, h2, g2, E2, y2, T2, v2, O2 = this.root.lookup("easemob.pb.CommSyncDL");
            O2 = O2.decode(e3.payload);
            var S2 = new (f())(O2.serverId.low, O2.serverId.high, O2.serverId.unsigned).toString(), C2 = new (f())(O2.metaId.low, O2.metaId.high, O2.metaId.unsigned).toString();
            if (0 !== O2.metas.length)
              try {
                De.call(this, O2.metas, O2.status);
              } catch (e4) {
                var N2 = m.create({ type: p.WEBIM_LOAD_MSG_ERROR, message: "decode message error", data: e4 });
                this.onError && this.onError(N2), null === (t3 = this.eventHandler) || void 0 === t3 || t3.dispatch("onError", N2);
              } finally {
                if (O2.isLast) {
                  var A2 = -1;
                  (U2 = this._queues.some(function(e4, t4) {
                    return e4.name === O2.name && (A2 = t4, true);
                  })) && A2 > 0 && this._queues.splice(A2, 1), this._queues.length > 0 && (He.call(this, this._queues[0]), this.qTimer && clearTimeout(this.qTimer));
                } else
                  Fe.call(this, O2.nextKey, O2.queue);
              }
            else if (O2.isLast) {
              var M2 = -1;
              (U2 = this._queues.some(function(e4, t4) {
                return e4.name === O2.queue.name && (M2 = t4, true);
              })) && this._queues.splice(M2, 1), this._queues.length > 0 && (He.call(this, this._queues[0]), this.qTimer && clearTimeout(this.qTimer));
            } else if (O2.status && 0 === O2.status.errorCode) {
              var b2 = -1, U2 = this._queues.some(function(e4, t4) {
                var r3;
                return e4.name === (null === (r3 = O2.queue) || void 0 === r3 ? void 0 : r3.name) && (b2 = t4, true);
              });
              U2 && this._queues.splice(b2, 1), this._queues.length > 0 && (He.call(this, this._queues[0]), this.qTimer && clearTimeout(this.qTimer)), (D2 = R.get(C2)) && ((0, D2.rpt)({ isEndApi: true, data: { isSuccess: 1, requestName: D2.requestName, requestMethod: "WEBSOCKET", requestUrl: this.url, code: _.success } }), R.delete(C2));
              var w2 = this._msgHash[C2];
              if (null == w2 ? void 0 : w2.isHandleChatroom) {
                try {
                  var k2 = "join" === (null === (r2 = this._msgHash[C2]) || void 0 === r2 ? void 0 : r2.operation);
                  (null === (o2 = this._msgHash[C2]) || void 0 === o2 ? void 0 : o2.resolve) instanceof Function && k2 && this._msgHash[C2].resolve({ type: 0, data: { action: "apply", id: this._msgHash[C2].roomId, result: true, user: this.context.userId } }), (null === (n2 = this._msgHash[C2]) || void 0 === n2 ? void 0 : n2.success) instanceof Function && k2 && this._msgHash[C2].success({ type: 0, data: { action: "apply", id: this._msgHash[C2].roomId, result: true, user: this.context.userId } }), (null === (i2 = this._msgHash[C2]) || void 0 === i2 ? void 0 : i2.resolve) instanceof Function && !k2 && this._msgHash[C2].resolve({ type: 0, data: { result: true } }), (null === (a2 = this._msgHash[C2]) || void 0 === a2 ? void 0 : a2.success) instanceof Function && !k2 && this._msgHash[C2].success({ type: 0, data: { result: true } });
                } catch (e4) {
                  N2 = m.create({ type: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, message: "when executing success function error", data: e4 }), this.onError && this.onError(N2), null === (s2 = this.eventHandler) || void 0 === s2 || s2.dispatch("onError", N2);
                }
                delete this._msgHash[C2];
              }
              if (w2 && !w2.isHandleChatroom) {
                I.has(C2) && (I.get(C2).rpt({ isEndApi: true, data: { isSuccess: 1, requestMethod: "WEBSOCKET", requestUrl: this.url, code: _.success, msgId: S2 } }), I.delete(C2));
                try {
                  (null === (c2 = this._msgHash[C2]) || void 0 === c2 ? void 0 : c2.resolve) instanceof Function && this._msgHash[C2].resolve({ localMsgId: C2, serverMsgId: S2 }), (null === (u2 = this._msgHash[C2]) || void 0 === u2 ? void 0 : u2.success) instanceof Function && this._msgHash[C2].success(C2, S2);
                } catch (e4) {
                  N2 = m.create({ type: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, message: "when executing success function error", data: e4 }), this.onError && this.onError(N2), null === (l2 = this.eventHandler) || void 0 === l2 || l2.dispatch("onError", N2);
                }
                this.onReceivedMessage && this.onReceivedMessage({ id: C2, mid: S2, to: this._msgHash[C2].to, time: 0 }), null === (d2 = this.eventHandler) || void 0 === d2 || d2.dispatch("onReceivedMessage", { id: C2, mid: S2, to: this._msgHash[C2].to }), delete this._msgHash[C2];
              }
            } else if (O2.status && 15 === O2.status.errorCode)
              (null === (h2 = this._msgHash[C2]) || void 0 === h2 ? void 0 : h2.fail) instanceof Function && this._msgHash[C2].fail({ type: p.SERVICE_NOT_ALLOW_MESSAGING_MUTE, reason: "you were muted" }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject({ type: p.SERVICE_NOT_ALLOW_MESSAGING_MUTE, reason: "you were muted" });
            else if (O2.status && 1 === O2.status.errorCode) {
              var P2 = void 0;
              switch (O2.status.reason) {
                case "blocked":
                  P2 = p.PERMISSION_DENIED;
                  break;
                case "group not found":
                  P2 = p.GROUP_NOT_EXIST;
                  break;
                case "not in group or chatroom":
                  P2 = p.GROUP_NOT_JOINED;
                  break;
                case "exceed recall time limit":
                  P2 = p.MESSAGE_RECALL_TIME_LIMIT;
                  break;
                case "message recall disabled":
                  P2 = p.SERVICE_NOT_ENABLED;
                  break;
                case "not in group or chatroom white list":
                  P2 = p.SERVICE_NOT_ALLOW_MESSAGING;
                  break;
                case "nonroster":
                  P2 = p.USER_NOT_FRIEND, O2.status.reason = "not contact";
                  break;
                case "group is disabled":
                  P2 = p.GROUP_IS_DISABLED, O2.status.reason = "group is disabled";
                  break;
                default:
                  O2.status.reason.includes("grpID") && O2.status.reason.includes("does not exist!") ? (P2 = p.CHATROOM_NOT_EXIST, O2.status.reason = "The chat room dose not exist.") : O2.status.reason.includes("username") && O2.status.reason.includes("doesn't exist!") ? P2 = p.USER_NOT_FOUND : "group member list is full!" === O2.status.reason ? P2 = p.CHATROOM_MEMBERS_FULL : O2.status.reason.includes("can not join this group") && O2.status.reason.includes("is in the blacklist") ? (P2 = p.PERMISSION_DENIED, O2.status.reason = "permission denied") : P2 = "can not operate this group, reason: group is disabled" === O2.status.reason ? p.GROUP_IS_DISABLED : O2.status.reason.includes("moderation") ? p.MESSAGE_MODERATION_BLOCKED : p.SERVER_UNKNOWN_ERROR;
              }
              if (this._msgHash[C2]) {
                if (null === (g2 = this._msgHash[C2]) || void 0 === g2 ? void 0 : g2.isHandleChatroom) {
                  var L2 = m.create({ type: P2, message: O2.status.reason || "", data: "" });
                  this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].error instanceof Function && this._msgHash[C2].error(L2);
                } else
                  L2 = m.create({ type: P2, message: O2.status.reason || "", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail({ type: P2, reason: O2.status.reason ? O2.status.reason : "", data: { id: C2, mid: S2 } });
                delete this._msgHash[C2];
              }
            } else if (O2.status && 7 === O2.status.errorCode)
              "sensitive words" === O2.status.reason && this._msgHash[C2] ? (L2 = m.create({ type: p.MESSAGE_INCLUDE_ILLEGAL_CONTENT, message: "sensitive words", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail({ type: p.MESSAGE_INCLUDE_ILLEGAL_CONTENT, data: { id: C2, mid: S2, reason: "sensitive words" } })) : "blocked by mod_antispam" === O2.status.reason && this._msgHash[C2] ? (L2 = m.create({ type: p.MESSAGE_INCLUDE_ILLEGAL_CONTENT, message: "blocked by mod_antispam", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail({ type: p.MESSAGE_INCLUDE_ILLEGAL_CONTENT, data: { id: C2, mid: S2, reason: "blocked by mod_antispam" } })) : "user is mute" === O2.status.reason && this._msgHash[C2] ? (L2 = m.create({ type: p.USER_MUTED_BY_ADMIN, message: "user is mute", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail(L2)) : "traffic limit" === O2.status.reason && this._msgHash[C2] && (L2 = m.create({ type: p.MESSAGE_CURRENT_LIMITING, message: "traffic limit", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail(L2));
            else if (O2.status && 19 === O2.status.errorCode)
              this._msgHash[C2] && (I.has(C2) && (I.get(C2).rpt({ isEndApi: true, data: { isSuccess: 0, requestMethod: "WEBSOCKET", requestUrl: this.url, code: p.MESSAGE_EXTERNAL_LOGIC_BLOCKED, codeDesc: O2.status.reason || "", msgId: S2 } }), I.delete(C2)), L2 = m.create({ type: p.MESSAGE_EXTERNAL_LOGIC_BLOCKED, message: O2.status.reason || "", data: { id: C2, mid: S2 } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail({ type: p.MESSAGE_EXTERNAL_LOGIC_BLOCKED, data: { id: C2, mid: S2, reason: O2.status.reason } }));
            else if (this._msgHash[C2]) {
              I.has(C2) && (I.get(C2).rpt({ isEndApi: true, data: { isSuccess: 0, requestMethod: "WEBSOCKET", requestUrl: this.url, code: p.WEBIM_LOAD_MSG_ERROR, codeDesc: (null === (E2 = O2.status) || void 0 === E2 ? void 0 : E2.reason) || "", msgId: S2 } }), I.delete(C2));
              try {
                L2 = m.create({ type: p.WEBIM_LOAD_MSG_ERROR, message: (null === (y2 = O2.status) || void 0 === y2 ? void 0 : y2.reason) || "", data: { id: C2, mid: S2, reason: O2.status && O2.status.reason } }), this._msgHash[C2].reject instanceof Function && this._msgHash[C2].reject(L2), this._msgHash[C2].fail instanceof Function && this._msgHash[C2].fail({ type: p.WEBIM_LOAD_MSG_ERROR, data: { errorCode: O2.status && O2.status.errorCode, reason: O2.status && O2.status.reason } });
              } catch (e4) {
                N2 = m.create({ type: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, message: "when executing fail function error", data: e4 }), this.onError && this.onError(N2), null === (T2 = this.eventHandler) || void 0 === T2 || T2.dispatch("onError", N2);
              }
              delete this._msgHash[C2];
            } else {
              var D2;
              I.has(C2) && (I.get(C2).rpt({ isEndApi: true, data: { isSuccess: 0, requestMethod: "WEBSOCKET", requestUrl: this.url, code: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, codeDesc: "on message error", msgId: S2 } }), I.delete(C2)), (D2 = R.get(C2)) && ((0, D2.rpt)({ isEndApi: true, data: { isSuccess: 0, requestName: D2.requestName, requestMethod: "WEBSOCKET", requestUrl: this.url, code: _.failed, codeDesc: "on message error" } }), R.delete(C2)), N2 = m.create({ type: p.WEBIM_CONNCTION_CALLBACK_INNER_ERROR, message: "on message error" }), this.onError && this.onError(N2), null === (v2 = this.eventHandler) || void 0 === v2 || v2.dispatch("onError", N2);
            }
          }
          function ot(e3) {
            var t3 = [], r2 = this.root.lookup("easemob.pb.KeyValue"), o2 = [];
            for (var n2 in e3) {
              var i2 = r2.decode(t3);
              i2.key = n2, "object" == typeof e3[n2] ? (i2.type = 8, i2.stringValue = JSON.stringify(e3[n2])) : "string" == typeof e3[n2] ? (i2.type = 7, i2.stringValue = e3[n2]) : "boolean" == typeof e3[n2] ? (i2.type = 1, i2.varintValue = true === e3[n2] ? 1 : 0) : Number.isInteger(e3[n2]) ? (i2.type = 2, i2.varintValue = e3[n2]) : (i2.type = 6, i2.doubleValue = e3[n2]), o2.push(i2);
            }
            return o2;
          }
          function nt(e3) {
            var t3, r2, o2 = [];
            if (this.root) {
              var n2, i2 = this.root.lookup("easemob.pb.MessageBody.Content").decode(o2);
              switch (n2 = !e3.group && "groupchat" !== (null === (t3 = null == e3 ? void 0 : e3.chatType) || void 0 === t3 ? void 0 : t3.toLowerCase()) || e3.roomType ? e3.group && e3.roomType || "chatroom" === (null === (r2 = null == e3 ? void 0 : e3.chatType) || void 0 === r2 ? void 0 : r2.toLowerCase()) ? "chatRoom" : "singleChat" : "groupChat", e3.type) {
                case "txt":
                  i2.type = 0, i2.text = e3.msg;
                  break;
                case "img":
                  i2.type = 1, e3.body ? (i2.displayName = e3.body.filename, i2.remotePath = e3.body.url, i2.secretKey = e3.body.secret, i2.fileLength = e3.body.file_length, i2.size = e3.body.size, i2.thumbnailDisplayName = e3.body.filename) : e3.file ? (i2.displayName = e3.file.filename, i2.remotePath = e3.file.url, i2.secretKey = e3.file.secret, i2.fileLength = e3.file.file_length, i2.size = e3.file.size, i2.thumbnailDisplayName = e3.file.filename) : (i2.displayName = e3.filename, i2.remotePath = e3.url, i2.secretKey = e3.secret, i2.fileLength = e3.file_length, i2.size = e3.size, i2.thumbnailDisplayName = e3.filename);
                  break;
                case "video":
                  i2.type = 2, i2.displayName = e3.body.filename, i2.remotePath = e3.body.url, i2.secretKey = e3.body.secret, i2.fileLength = e3.body.file_length, i2.duration = e3.body.length, i2.thumbnailDisplayName = e3.body.filename;
                  break;
                case "loc":
                  i2.type = 3, i2.latitude = e3.lat, i2.longitude = e3.lng, i2.address = e3.addr, i2.buildingName = e3.buildingName, i2.latitude = e3.lat;
                  break;
                case "audio":
                  i2.type = 4, i2.displayName = e3.body.filename, i2.remotePath = e3.body.url, i2.secretKey = e3.body.secret, i2.fileLength = e3.body.file_length, i2.duration = e3.body.length, i2.thumbnailDisplayName = e3.body.filename;
                  break;
                case "file":
                  i2.type = 5, i2.displayName = e3.body.filename, i2.remotePath = e3.body.url, i2.secretKey = e3.body.secret, i2.fileLength = e3.body.file_length, i2.size = e3.body.size, i2.thumbnailDisplayName = e3.body.filename;
                  break;
                case "cmd":
                  i2.type = 6, i2.action = e3.action;
                  break;
                case "custom":
                  i2.type = 7, i2.customEvent = e3.customEvent, i2.customExts = ot.call(this, e3.customExts);
              }
              var a2 = [];
              e3.ext && (a2 = ot.call(this, e3.ext));
              var s2 = this.root.lookup("easemob.pb.MessageBody"), c2 = s2.decode(o2);
              c2.from = { name: this.context.jid.name }, c2.to = { name: e3.to }, "channel" === e3.type ? c2.type = 7 : "recall" === e3.type ? (c2.type = 6, c2.ackMessageId = e3.ackId) : "delivery" === e3.type ? (c2.type = 5, c2.ackMessageId = e3.ackId) : "read" === e3.type ? (c2.type = 4, c2.ackMessageId = e3.ackId, "groupChat" === n2 && (c2.msgConfig = { allowGroupAck: true }, c2.ackContent = e3.ackContent)) : "chatRoom" === n2 ? c2.type = 3 : "groupChat" === n2 ? (c2.type = 2, e3.msgConfig && (c2.msgConfig = { allowGroupAck: true })) : "singleChat" === n2 && (c2.type = 1), c2.contents = [i2], c2.ext = a2;
              var u2 = function(e4) {
                var t4 = {};
                return "translations" in e4 && (t4.translations = e4.translations), "isChatThread" in e4 && e4.isChatThread && (t4.thread = {}), Object.keys(t4).length > 0 ? JSON.stringify(t4) : "";
              }(e3);
              u2 && (c2.meta = u2), c2 = s2.encode(c2).finish();
              var l2 = this.root.lookup("easemob.pb.Meta").decode(o2);
              l2.id = e3.id;
              var d2 = "easemob.com";
              "chatRoom" !== n2 && "groupChat" !== n2 || (d2 = "conference.easemob.com"), l2.to = { appKey: this.appKey, name: e3.to, domain: d2 }, "chatRoom" === n2 && (l2.ext = ot.call(this, function(e4) {
                return { chatroom_msg_tag: "high" === e4.priority ? 0 : "low" === e4.priority ? 2 : 1 };
              }(e3))[0]), l2.ns = 1, l2.payload = c2, l2.routetype = e3.deliverOnlineOnly ? 1 : 0;
              var h2 = this.root.lookup("easemob.pb.CommSyncUL"), f2 = h2.decode(o2);
              f2.meta = l2, f2 = h2.encode(f2).finish();
              var m2 = this.root.lookup("easemob.pb.MSync"), g2 = m2.decode(o2);
              return g2.version = this.version, g2.encryptType = this.encryptType, g2.command = 0, g2.payload = f2, m2.encode(g2).finish();
            }
            e3.fail && e3.fail({ type: p.WEBIM_CONNCTION_CLIENT_OFFLINE, message: "Not logged in" });
          }
          function it(e3) {
            var t3 = this, r2 = Ue({}, e3);
            if (e3.file)
              return r2.accessToken = this.token, r2.appKey = this.appKey, r2.apiUrl = this.apiUrl, r2.body && r2.body.url ? nt.call(this, r2) : new Promise(function(o3, n2) {
                var i2 = r2.onFileUploadComplete;
                r2.onFileUploadComplete = function(o4) {
                  var n3, a2;
                  if (o4.entities[0]["file-metadata"]) {
                    var s2 = o4.entities[0]["file-metadata"]["content-length"];
                    r2.file_length = s2, r2.filetype = o4.entities[0]["file-metadata"]["content-type"], s2 > 204800 && (r2.thumbnail = true);
                  }
                  r2.body = { type: r2.type || "file", secret: o4.entities[0]["share-secret"], filename: r2.file.filename || r2.filename, url: (t3.isHttpDNS ? t3.apiUrl + o4.uri.substr(o4.uri.indexOf("/", 9)) : o4.uri) + "/" + o4.entities[0].uuid, length: r2.length || 0, filetype: r2.filetype || r2.file.filetype, file_length: (null === (a2 = null === (n3 = r2.file) || void 0 === n3 ? void 0 : n3.data) || void 0 === a2 ? void 0 : a2.size) || 0, size: { width: r2.width || 0, height: r2.height || 0 } }, r2.file.url = o4.uri, e3.secret = o4.entities[0]["share-secret"];
                  var c2 = (t3.isHttpDNS ? t3.apiUrl + o4.uri.substr(o4.uri.indexOf("/", 9)) : o4.uri) + "/" + o4.entities[0].uuid;
                  e3.url = c2, o4.url = c2, "img" === r2.type && (e3.thumb = "".concat(c2, "?thumbnail=true"), o4.thumb = "".concat(c2, "?thumbnail=true")), i2 instanceof Function && i2(o4, r2.id);
                  var u2 = nt.call(t3, r2);
                  I.size <= S && I.set(r2.id, { rpt: t3.dataReport.geOperateFun({ operationName: E.SEND_MSG }) }), ut.call(t3, u2);
                }, $2.uploadFile.call(t3, r2, E.UPLOAD_MSG_ATTACH);
              });
            "img" === e3.type && (r2.body || (r2.body = Ue(Ue({}, r2), { size: { width: r2.width || 0, height: r2.height || 0 } })));
            var o2 = nt.call(this, r2);
            ut.call(this, o2);
          }
          function at(e3, t3, r2) {
            var o2 = [], n2 = this.root.lookup("easemob.pb.MUCBody"), i2 = n2.decode(o2);
            i2.mucId = { appKey: this.appKey, name: e3, domain: "conference.easemob.com" }, i2.operation = "join" === r2 ? 2 : 3, i2.from = { name: this.context.userId }, i2.isChatroom = true, i2 = n2.encode(i2).finish();
            var a2 = this.root.lookup("easemob.pb.Meta").decode(o2);
            a2.id = t3, a2.from = { appKey: this.appKey, name: this.context.userId, domain: "easemob.com", client_resource: this.context.jid.clientResource }, a2.to = { domain: "easemob.com" }, a2.ns = 2, a2.payload = i2;
            var s2 = this.root.lookup("easemob.pb.CommSyncUL"), c2 = s2.decode(o2);
            c2.meta = a2, c2 = s2.encode(c2).finish();
            var u2 = this.root.lookup("easemob.pb.MSync"), l2 = u2.decode(o2);
            return l2.version = this.version, l2.encryptType = this.encryptType, l2.command = 0, l2.payload = c2, u2.encode(l2).finish();
          }
          function st(e3, t3) {
            var r2 = $2.getUniqueId(), o2 = at.call(this, e3.roomId, r2, t3);
            return ut.call(this, Ue(Ue({}, e3), { isHandleChatroom: true, joinMsg: o2, id: r2, operation: t3 }), r2);
          }
          function ct(e3) {
            var t3 = this;
            return new Promise(function(r2, o2) {
              var n2, i2;
              if (t3.logOut)
                return o2({ type: p.WEBIM_CONNECTION_CLOSED, message: "not login" });
              if (!e3.id || "string" != typeof e3.id || "" === e3.id)
                return o2({ type: p.MESSAGE_PARAMETER_ERROR, message: 'Missing required parameter: "id"' });
              if (!e3.to || "string" != typeof e3.to || "" === e3.to)
                return o2({ type: p.MESSAGE_PARAMETER_ERROR, message: 'Missing required parameter: "to"' });
              var a2 = "file" === e3.type || "img" === e3.type || "audio" === e3.type || "video" === e3.type, s2 = "delivery" === e3.type || "read" === e3.type || "channel" === e3.type;
              if (e3.id && ((!a2 && !s2 || a2 && t3.useOwnUploadFun) && I.size <= S && I.set(e3.id, { rpt: t3.dataReport.geOperateFun({ operationName: "recall" === e3.type ? E.SEND_RECALL_MSG : E.SEND_MSG }) }), t3._msgHash[e3.id] = Ue(Ue({}, e3), { resolve: r2, reject: o2 })), a2)
                return it.call(t3, e3);
              if ("txt" === e3.type && (null === (n2 = e3.msgConfig) || void 0 === n2 ? void 0 : n2.languages) && Array.isArray(null === (i2 = e3.msgConfig) || void 0 === i2 ? void 0 : i2.languages) && e3.msgConfig.languages.length > 0) {
                var c2 = t3.translateMessage || t3.translation.translateMessage;
                if (!c2)
                  throw new Error("there is no method to translate message");
                c2({ text: e3.msg, languages: e3.msgConfig.languages }).then(function(r3) {
                  var o3, n3 = null === (o3 = r3.data[0]) || void 0 === o3 ? void 0 : o3.translations;
                  n3 = n3.map(function(e4) {
                    return { code: e4.to, text: e4.text };
                  }), e3.translations = n3;
                  var i3 = nt.call(t3, e3);
                  ut.call(t3, i3, e3.id);
                }).catch(function(e4) {
                  o2(e4);
                });
              } else {
                var u2 = nt.call(t3, e3);
                ut.call(t3, u2, e3.id);
              }
            });
          }
          function ut(e3, t3) {
            var r2, o2 = this;
            if (e3.isHandleChatroom) {
              if (!this.isOpened()) {
                var n2 = { data: "", type: p.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected" };
                return Promise.reject(n2);
              }
              return new Promise(function(r3, n3) {
                var i2;
                o2._msgHash[e3.id] = Ue(Ue({}, e3), { resolve: r3, reject: n3 }), i2 = "miniCore" === o2.name ? e3.joinMsg : Pe.call(o2, e3.joinMsg, t3), o2.sock.send(i2);
              });
            }
            if (!this.isOpened())
              return this.unSendMsgArr.push(e3), !this.logOut && this.autoReconnectNumTotal < this.autoReconnectNumMax && (this.autoReconnectNumTotal <= this.socketHost.length && this.isHttpDNS || !this.isHttpDNS) && (G.debug("need to reconnect", this.autoReconnectNumTotal, this.autoReconnectNumMax), this.offLineSendConnecting = true, this.reconnecting || this.reconnect()), void (this.onError && this.onError({ type: p.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected" }));
            r2 = "miniCore" === this.name ? e3 : Pe.call(this, e3, t3), this.sock.send(r2);
          }
          var lt = function(e3, t3) {
            return e3.send = ct, e3.sendMsg = ct, G.debug("init Msync by ".concat(e3.name)), { generateProvision: ke.bind(e3), base64transform: Pe.bind(e3), distributeMeta: Le.bind(e3), decodeMeta: De.bind(e3), decodeUnreadDL: Ge.bind(e3), _rebuild: xe.bind(e3), _lastsession: je.bind(e3), receiveProvision: We.bind(e3), isInQueue: Ye.bind(e3), decodeNotice: Qe.bind(e3), decodeMSync: Ze.bind(e3), distributeMSync: et.bind(e3), encodeChatMsg: nt.bind(e3), upLoadFile: it.bind(e3), send: ct.bind(e3), stopHeartBeat: Je.bind(e3), handleChatRoom: st.bind(e3) };
          }, pt = function() {
            function e3(e4, t3, r2) {
              this.handlerData = {}, this.handlerData = {}, e4.addEventHandler = this.addEventHandler.bind(this), e4.removeEventHandler = this.removeEventHandler.bind(this);
            }
            return e3.prototype.addEventHandler = function(e4, t3) {
              this.handlerData[e4] = t3;
            }, e3.prototype.removeEventHandler = function(e4) {
              delete this.handlerData[e4];
            }, e3.prototype.dispatch = function(e4, t3) {
              for (var r2 in G.debug("dispatch event: " + e4, t3 || ""), this.handlerData) {
                var o2 = this.handlerData[r2][e4];
                o2 && o2(t3);
              }
            }, e3;
          }(), dt = function() {
          };
          function ht(e3) {
            this.onOpened = e3.onOpened || dt, this.onPresence = e3.onPresence || dt, this.onTextMessage = e3.onTextMessage || dt, this.onPictureMessage = e3.onPictureMessage || dt, this.onAudioMessage = e3.onAudioMessage || dt, this.onVideoMessage = e3.onVideoMessage || dt, this.onFileMessage = e3.onFileMessage || dt, this.onLocationMessage = e3.onLocationMessage || dt, this.onCmdMessage = e3.onCmdMessage || dt, this.onCustomMessage = e3.onCustomMessage || dt, this.onReceivedMessage = e3.onReceivedMessage || dt, this.onDeliveredMessage = e3.onDeliveredMessage || dt, this.onReadMessage = e3.onReadMessage || dt, this.onRecallMessage = e3.onRecallMessage || dt, this.onChannelMessage = e3.onChannelMessage || dt, this.onError = e3.onError || dt, this.onOffline = e3.onOffline || dt, this.onOnline = e3.onOnline || dt, this.onStatisticMessage = e3.onStatisticMessage || dt, this.onContactInvited = e3.onContactInvited || dt, this.onContactAgreed = e3.onContactAgreed || dt, this.onContactRefuse = e3.onContactRefuse || dt, this.onContactDeleted = e3.onContactDeleted || dt, this.onContactAdded = e3.onContactAdded || dt, this.onTokenWillExpire = e3.onTokenWillExpire || dt, this.onTokenExpired = e3.onTokenExpired || dt, this.onClosed = e3.onClosed || dt, this.onPresenceStatusChange = e3.onPresenceStatusChange || dt;
          }
          var ft = { biz: "", debug: false, token: "" }, mt = "https://data-reporting.agora.io/report", gt = "https://data-reporting.sh.agoralab.co/report", Et = function(e3) {
            var t3 = Number(g[e3]);
            return t3 === g.USER_LOGIN ? "MANUALLOGIN" : t3 === g.MSYNC_SENDMESSAGE ? "SENDMESSAGE" : t3 > g.UNKNOWOPERATION && t3 < g.REST_OPERATE ? "REST" : t3 > g.REST_OPERATE && t3 < g.MSYNC_OPERATE ? "MESSAGE" : t3 > g.MSYNC_OPERATE && t3 < g.ROSTER_OPERATE ? "ROSTER" : t3 > g.ROSTER_OPERATE && t3 < g.USER_OPERATE ? "USER" : t3 > g.USER_OPERATE && t3 < g.GROUP_OPERATE ? "GROUP" : t3 > g.GROUP_OPERATE && t3 < g.CHATROOM_OPERATE ? "CHATROOM" : "OPERATION";
          }, yt = function() {
            return new Date().getTime();
          }, Tt = function(e3) {
            return [K.BAIDU, K.WX, K.DD, K.ZFB, K.TT, K.QUICK_APP, K.UNI].includes(e3.platform);
          }, _t = function() {
            return e3 = 1, t3 = 99999, e3 = Math.ceil(e3), t3 = Math.floor(t3), Math.floor(Math.random() * (t3 - e3)) + e3;
            var e3, t3;
          }, vt = {}, Ot = 1e3, Rt = function() {
            function e3(e4) {
              this.eventQueue = [], this.stock = Ot, this.config = e4, this.governor();
            }
            return e3.prototype.add = function(e4) {
              this.stock <= 0 ? console.warn("Event Report limit ".concat(Ot, " per minute")) : (this.eventQueue.push(e4), this.consume(), this.stock -= 1);
            }, e3.prototype.consume = function() {
              var e4 = this;
              0 !== this.eventQueue.length && (this.timer && this.eventQueue.length <= 10 && clearTimeout(this.timer), this.timer = setTimeout(function() {
                var t3, r2 = e4.eventQueue.splice(0, 10), o2 = r2.filter(function(e5) {
                  return e5.appId === r2[0].appId;
                }), n2 = r2.filter(function(e5) {
                  return e5.appId !== r2[0].appId;
                });
                (t3 = e4.eventQueue).unshift.apply(t3, n2), e4.batchSend(o2);
              }, 1e3));
            }, e3.prototype.governor = function() {
              var e4 = this, t3 = setInterval(function() {
                e4.stock = Ot;
              }, 6e4);
              "undefined" != typeof addEventListener && addEventListener("beforeunload", function() {
                clearInterval(t3);
              });
            }, e3.prototype.batchSend = function(e4) {
              var t3, r2;
              if (void 0 === e4 && (e4 = []), 0 !== e4.length)
                try {
                  var o2 = e4.map(function(e5) {
                    e5.biz, e5.appId;
                    var t4 = e5.eventId, r3 = function(e6, t5) {
                      var r4 = {};
                      for (var o3 in e6)
                        Object.prototype.hasOwnProperty.call(e6, o3) && t5.indexOf(o3) < 0 && (r4[o3] = e6[o3]);
                      if (null != e6 && "function" == typeof Object.getOwnPropertySymbols) {
                        var n2 = 0;
                        for (o3 = Object.getOwnPropertySymbols(e6); n2 < o3.length; n2++)
                          t5.indexOf(o3[n2]) < 0 && Object.prototype.propertyIsEnumerable.call(e6, o3[n2]) && (r4[o3[n2]] = e6[o3[n2]]);
                      }
                      return r4;
                    }(e5, ["biz", "appId", "eventId"]);
                    return { eventId: Number(t4), body: r3 };
                  });
                  !function(e5, t4) {
                    try {
                      var r3 = t4.biz, o3 = t4.appId, n2 = t4.data, i2 = t4.debug, a2 = t4.onSuccess;
                      if (!r3)
                        throw new Error("biz is not defined");
                      vt.global || (vt = $2.getEnvInfo());
                      var s2 = vt;
                      if (Tt(s2)) {
                        var c2 = { url: i2 ? gt : mt, data: n2, method: "POST", success: function() {
                          null == a2 || a2();
                        }, fail: function() {
                        }, complete: function() {
                        } }, u2 = { token: e5, appid: null != o3 ? o3 : "", sendts: "".concat(Math.floor(new Date().getTime() / 1e3)), biz: r3, debug: "".concat(i2) };
                        if ("zfb" === s2.platform || "dd" === s2.platform ? c2.headers = u2 : c2.header = u2, "dd" === s2.platform)
                          return s2.global.httpRequest(c2);
                        s2.global.request(c2);
                      } else {
                        var l2 = new XMLHttpRequest();
                        l2.onreadystatechange = function() {
                          2 === l2.readyState && (null == a2 || a2());
                        }, l2.open("POST", i2 ? gt : mt), l2.setRequestHeader("Content-Type", "application/json"), l2.setRequestHeader("token", e5), l2.setRequestHeader("appid", null != o3 ? o3 : ""), l2.setRequestHeader("sendts", "".concat(Math.floor(new Date().getTime() / 1e3))), l2.setRequestHeader("biz", r3), l2.setRequestHeader("debug", "".concat(i2)), l2.send(JSON.stringify(n2));
                      }
                    } catch (e6) {
                      console.error(e6);
                    }
                  }(this.config.token, { biz: null === (t3 = e4[0]) || void 0 === t3 ? void 0 : t3.biz, appId: null === (r2 = e4[0]) || void 0 === r2 ? void 0 : r2.appId, data: o2, debug: this.config.debug, onSuccess: this.consume.bind(this) });
                } catch (e5) {
                  console.error(e5);
                }
            }, e3;
          }(), It = function() {
            return It = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, It.apply(this, arguments);
          }, St = new (function() {
            function e3(e4) {
              this.inited = false, this.appId = "", this.biz = "", this.eventQueue = {}, this.config = ft, e4 && this.init(e4);
            }
            return e3.prototype.init = function(e4) {
              var t3;
              if (void 0 === e4 && (e4 = {}), !e4.biz || !e4.token)
                throw new Error("Event Report: biz or token is not defined");
              try {
                this.appId = null !== (t3 = e4.appId) && void 0 !== t3 ? t3 : "", this.biz = e4.biz, this.config = It(It({}, ft), e4), this.eventQueue = new Rt(this.config), this.log(e4), this.inited = true;
              } catch (e5) {
                console.error(e5);
              }
            }, e3.prototype.send = function(e4, t3, r2) {
              var o2;
              if (void 0 === t3 && (t3 = {}), this.inited) {
                var n2 = It(It({}, t3), { eventId: Number(e4), biz: this.biz, appId: null !== (o2 = null == r2 ? void 0 : r2.appId) && void 0 !== o2 ? o2 : this.appId });
                this.eventQueue.add(n2), this.log(n2);
              } else
                console.error("Event Report: init is not called");
            }, e3.prototype.log = function(e4) {
              try {
                if (this.config.debug) {
                  var t3 = e4.payload, r2 = function(e5, t4) {
                    var r3 = {};
                    for (var o2 in e5)
                      Object.prototype.hasOwnProperty.call(e5, o2) && t4.indexOf(o2) < 0 && (r3[o2] = e5[o2]);
                    if (null != e5 && "function" == typeof Object.getOwnPropertySymbols) {
                      var n2 = 0;
                      for (o2 = Object.getOwnPropertySymbols(e5); n2 < o2.length; n2++)
                        t4.indexOf(o2[n2]) < 0 && Object.prototype.propertyIsEnumerable.call(e5, o2[n2]) && (r3[o2[n2]] = e5[o2[n2]]);
                    }
                    return r3;
                  }(e4, ["payload"]);
                  console.log("%c Event Report: ".concat(this.config.biz, " "), "background: #8A97FC; color: #fff"), console.table(r2), t3 && (console.info("payload:"), console.table(t3));
                }
              } catch (e5) {
                console.error(e5);
              }
            }, e3;
          }())(), Ct = function() {
            return Ct = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, Ct.apply(this, arguments);
          }, Nt = { requestName: "", subrequestid: "1", requestMethod: "GET", requestUrl: "", requestElapse: 0, code: 0, codeDesc: "", isLastApi: 0, isSuccess: 1 }, At = function() {
            function e3(e4) {
              this.platform = $2.getEnvInfo(), this.isReportDt = e4.isReport || false, this.isCollectDt = true, Tt(this.platform) && !this.isReportDt && (this.isCollectDt = false), this.eventQueue = [], this.accessChannel = "direct", this.options = function(e5, t3) {
                t3.platform || (t3 = $2.getEnvInfo());
                var r2 = e5.org, o2 = e5.appkey, n2 = e5.deviceId, i2 = e5.sdkVersion, a2 = (null === navigator || void 0 === navigator ? void 0 : navigator.userAgent) || "".concat(t3.platform, "_mini_program");
                return { org: r2, appkey: o2, deviceId: n2, sdkServiceId: "sid_".concat($2.getUniqueId(), "_").concat(_t()), did: a2, sdkVersion: i2, os: 7, sdkProduct: v.web };
              }(e4, this.platform), this.sid = this.options.sdkServiceId, this.init(e4);
            }
            return e3.getInstance = function() {
              return e3.instance;
            }, e3.prototype.getServiceId = function() {
              return this.sid || "sid_0";
            }, e3.prototype.setIsReportDt = function(e4) {
              this.isReportDt = e4, e4 && this.rptEventQueue();
            }, e3.prototype.setIsCollectDt = function(e4) {
              this.isCollectDt = e4, e4 || (this.eventQueue = []);
            }, e3.prototype.rptEventQueue = function() {
              var e4 = this;
              this.eventQueue.length && this.eventQueue.forEach(function(t3, r2) {
                St.send(t3.eventId, t3.dt), r2 >= e4.eventQueue.length - 1 && (e4.eventQueue = []);
              });
            }, e3.prototype.init = function(t3) {
              e3.instance || (e3.instance = this, St.init({ biz: "im", token: "32f24ab2ddb74f508aa9286c356cec84", appId: t3.appkey, debug: false }), this.reportInit());
            }, e3.prototype.reportInit = function() {
              if (this.isCollectDt) {
                var e4 = this.options, t3 = e4.did, r2 = e4.os, o2 = e4.sdkVersion, n2 = e4.deviceId;
                this.reportData(9674, { did: t3, os: r2, sdkVersion: o2, deviceId: n2 });
              }
            }, e3.prototype.geOperateFun = function(e4) {
              var t3 = this;
              if (!this.isCollectDt)
                return function() {
                };
              var r2 = 1, o2 = 0, n2 = "", i2 = yt(), a2 = e4.uid, s2 = e4.operationName;
              a2 && (this.uid = a2);
              var c2 = { uid: this.uid, operationId: "opr_".concat($2.getUniqueId(), "_").concat(_t()), requestid: "req_".concat($2.getUniqueId(), "_").concat(_t()), operationName: s2 };
              return function(e5) {
                var a3, u2, l2, p2;
                if (e5.data.isSuccess ? (o2 = 0, n2 = "") : (0 === e5.data.code && (e5.data.code = -1), o2 = null !== (a3 = e5.data.code) && void 0 !== a3 ? a3 : o2, n2 = null !== (u2 = e5.data.codeDesc) && void 0 !== u2 ? u2 : n2), (null === (l2 = e5.data) || void 0 === l2 ? void 0 : l2.accessChannel) && (t3.accessChannel = null === (p2 = e5.data) || void 0 === p2 ? void 0 : p2.accessChannel), e5.isRetry ? (r2++, e5.data.subrequestid = "".concat(r2)) : (c2.requestid = "req_".concat($2.getUniqueId(), "_").concat(_t()), r2 = 1), e5.data.isLastApi) {
                  var d2 = yt();
                  e5.data.requestElapse = d2 - i2, e5.data.requestMethod = "", e5.data.subrequestid = "0", e5.data.code = 200 === o2 ? 0 : o2, e5.data.codeDesc = n2;
                } else
                  e5.data.requestName || (e5.data.requestName = s2);
                e5.data.requestElapse || (e5.data.requestElapse = yt() - i2), t3.reportData.call(t3, C, Ct(Ct(Ct(Ct({}, Nt), c2), e5.data), { accessChannel: t3.accessChannel, operationType: Et(s2) })), e5.isEndApi && t3.reportData.call(t3, C, Ct(Ct(Ct({}, c2), Nt), { isSuccess: e5.data.isSuccess, isLastApi: 1, subrequestid: "0", requestMethod: "", code: 200 === o2 ? 0 : o2, codeDesc: n2, requestElapse: e5.data.requestElapse, accessChannel: t3.accessChannel, operationType: Et(s2) }));
              };
            }, e3.prototype.reportData = function(e4, t3) {
              return r2 = this, o2 = void 0, i2 = function() {
                var r3, o3, n3, i3, a2, s2, c2, u2;
                return function(e5, t4) {
                  var r4, o4, n4, i4, a3 = { label: 0, sent: function() {
                    if (1 & n4[0])
                      throw n4[1];
                    return n4[1];
                  }, trys: [], ops: [] };
                  return i4 = { next: s3(0), throw: s3(1), return: s3(2) }, "function" == typeof Symbol && (i4[Symbol.iterator] = function() {
                    return this;
                  }), i4;
                  function s3(i5) {
                    return function(s4) {
                      return function(i6) {
                        if (r4)
                          throw new TypeError("Generator is already executing.");
                        for (; a3; )
                          try {
                            if (r4 = 1, o4 && (n4 = 2 & i6[0] ? o4.return : i6[0] ? o4.throw || ((n4 = o4.return) && n4.call(o4), 0) : o4.next) && !(n4 = n4.call(o4, i6[1])).done)
                              return n4;
                            switch (o4 = 0, n4 && (i6 = [2 & i6[0], n4.value]), i6[0]) {
                              case 0:
                              case 1:
                                n4 = i6;
                                break;
                              case 4:
                                return a3.label++, { value: i6[1], done: false };
                              case 5:
                                a3.label++, o4 = i6[1], i6 = [0];
                                continue;
                              case 7:
                                i6 = a3.ops.pop(), a3.trys.pop();
                                continue;
                              default:
                                if (!((n4 = (n4 = a3.trys).length > 0 && n4[n4.length - 1]) || 6 !== i6[0] && 2 !== i6[0])) {
                                  a3 = 0;
                                  continue;
                                }
                                if (3 === i6[0] && (!n4 || i6[1] > n4[0] && i6[1] < n4[3])) {
                                  a3.label = i6[1];
                                  break;
                                }
                                if (6 === i6[0] && a3.label < n4[1]) {
                                  a3.label = n4[1], n4 = i6;
                                  break;
                                }
                                if (n4 && a3.label < n4[2]) {
                                  a3.label = n4[2], a3.ops.push(i6);
                                  break;
                                }
                                n4[2] && a3.ops.pop(), a3.trys.pop();
                                continue;
                            }
                            i6 = t4.call(e5, a3);
                          } catch (e6) {
                            i6 = [6, e6], o4 = 0;
                          } finally {
                            r4 = n4 = 0;
                          }
                        if (5 & i6[0])
                          throw i6[1];
                        return { value: i6[0] ? i6[1] : void 0, done: true };
                      }([i5, s4]);
                    };
                  }
                }(this, function(l2) {
                  switch (l2.label) {
                    case 0:
                      return l2.trys.push([0, 3, , 4]), r3 = yt(), o3 = 0, e4 !== C ? [3, 2] : [4, (p2 = this.platform, new Promise(function(e5) {
                        var t4;
                        p2.platform || (p2 = $2.getEnvInfo());
                        var r4 = "";
                        if (p2.platform === K.WEB) {
                          var o4 = navigator.connection;
                          (null == o4 ? void 0 : o4.type) ? (null == o4 || o4.type, r4 = T.WIFI) : (null == o4 ? void 0 : o4.effectiveType) && (r4 = T[o4.effectiveType.toLocaleUpperCase()]), e5(r4);
                        } else
                          p2.platform === K.NODE ? (r4 = T.UNKNOWN, e5(r4)) : null === (t4 = p2.global) || void 0 === t4 || t4.getNetworkType({ success: function(t5) {
                            r4 = T[t5.networkType.toLocaleUpperCase()], e5(r4);
                          } });
                      }))];
                    case 1:
                      o3 = l2.sent(), l2.label = 2;
                    case 2:
                      return n3 = this.options, i3 = n3.appkey, a2 = n3.sdkServiceId, s2 = n3.sdkProduct, c2 = Ct({ lts: r3, net: o3, appkey: i3, sdkServiceId: a2, sdkProduct: s2 }, t3), this.isReportDt ? St.send(e4, c2) : this.isCollectDt && this.eventQueue.push({ eventId: e4, dt: c2 }), [3, 4];
                    case 3:
                      return u2 = l2.sent(), console.warn(u2), [3, 4];
                    case 4:
                      return [2];
                  }
                  var p2;
                });
              }, new ((n2 = void 0) || (n2 = Promise))(function(e5, t4) {
                function a2(e6) {
                  try {
                    c2(i2.next(e6));
                  } catch (e7) {
                    t4(e7);
                  }
                }
                function s2(e6) {
                  try {
                    c2(i2.throw(e6));
                  } catch (e7) {
                    t4(e7);
                  }
                }
                function c2(t5) {
                  var r3;
                  t5.done ? e5(t5.value) : (r3 = t5.value, r3 instanceof n2 ? r3 : new n2(function(e6) {
                    e6(r3);
                  })).then(a2, s2);
                }
                c2((i2 = i2.apply(r2, o2 || [])).next());
              });
              var r2, o2, n2, i2;
            }, e3;
          }(), Mt = At;
          function bt() {
            var e3 = this.context.appName, t3 = this.context.orgName;
            return !(!e3 || !t3) || (this.onError && this.onError({ type: p.WEBIM_CONNCTION_AUTH_ERROR, message: "appName or orgName is illegal" }), false);
          }
          function Ut() {
            var e3;
            if (!this.context.accessToken) {
              var t3 = m.create({ type: p.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR, message: "token not assign error" });
              return this.onError && this.onError(t3), null === (e3 = this.eventHandler) || void 0 === e3 || e3.dispatch("onError", t3), false;
            }
            return true;
          }
          function wt() {
            return Ut.call(this) && bt.call(this);
          }
          function kt(e3) {
            var t3 = e3.data, r2 = e3.type;
            return { data: { status: Object.keys(t3.errorKeys).length > 0 ? "fail" : "success", errorKeys: t3.errorKeys, successKeys: t3.successKeys }, type: r2 };
          }
          function Pt(e3) {
            var t3 = e3.data, r2 = void 0;
            return Object.keys(t3.errorKeys).length > 0 && Object.keys(t3.errorKeys).forEach(function(e4) {
              var o2 = t3.errorKeys[e4];
              r2 = o2.includes("is not part of you") ? m.create({ type: p.NO_PERMISSION, message: o2 }) : o2.includes("size of metadata for this single chatroom exceeds the user defined limit") || o2.includes("total size of chatroom metadata for this app exceeds the user defined limit") || o2.includes("is exceeding maximum limit") ? m.create({ type: p.MAX_LIMIT, message: o2 }) : o2.includes("is not Legal") ? m.create({ type: p.REQUEST_PARAMETER_ERROR, message: o2 }) : o2.includes("Failed to update userMetadata. Concurrent updates not allowed") ? m.create({ type: p.OPERATION_NOT_ALLOWED, message: o2 }) : m.create({ type: p.WEBIM_CONNCTION_AJAX_ERROR, message: o2 });
            }), r2;
          }
          var Lt = function() {
            return Lt = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, Lt.apply(this, arguments);
          }, Dt = function(e3, t3, r2, o2) {
            return new (r2 || (r2 = Promise))(function(n2, i2) {
              function a2(e4) {
                try {
                  c2(o2.next(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function s2(e4) {
                try {
                  c2(o2.throw(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function c2(e4) {
                var t4;
                e4.done ? n2(e4.value) : (t4 = e4.value, t4 instanceof r2 ? t4 : new r2(function(e5) {
                  e5(t4);
                })).then(a2, s2);
              }
              c2((o2 = o2.apply(e3, t3 || [])).next());
            });
          }, Gt = function(e3, t3) {
            var r2, o2, n2, i2, a2 = { label: 0, sent: function() {
              if (1 & n2[0])
                throw n2[1];
              return n2[1];
            }, trys: [], ops: [] };
            return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
              return this;
            }), i2;
            function s2(i3) {
              return function(s3) {
                return function(i4) {
                  if (r2)
                    throw new TypeError("Generator is already executing.");
                  for (; a2; )
                    try {
                      if (r2 = 1, o2 && (n2 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((n2 = o2.return) && n2.call(o2), 0) : o2.next) && !(n2 = n2.call(o2, i4[1])).done)
                        return n2;
                      switch (o2 = 0, n2 && (i4 = [2 & i4[0], n2.value]), i4[0]) {
                        case 0:
                        case 1:
                          n2 = i4;
                          break;
                        case 4:
                          return a2.label++, { value: i4[1], done: false };
                        case 5:
                          a2.label++, o2 = i4[1], i4 = [0];
                          continue;
                        case 7:
                          i4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!((n2 = (n2 = a2.trys).length > 0 && n2[n2.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === i4[0] && (!n2 || i4[1] > n2[0] && i4[1] < n2[3])) {
                            a2.label = i4[1];
                            break;
                          }
                          if (6 === i4[0] && a2.label < n2[1]) {
                            a2.label = n2[1], n2 = i4;
                            break;
                          }
                          if (n2 && a2.label < n2[2]) {
                            a2.label = n2[2], a2.ops.push(i4);
                            break;
                          }
                          n2[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      i4 = t3.call(e3, a2);
                    } catch (e4) {
                      i4 = [6, e4], o2 = 0;
                    } finally {
                      r2 = n2 = 0;
                    }
                  if (5 & i4[0])
                    throw i4[1];
                  return { value: i4[0] ? i4[1] : void 0, done: true };
                }([i3, s3]);
              };
            }
          };
          function xt(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/users/" + this.user + "/blocks/users", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2 }, success: function(t4) {
              var r3 = {};
              t4.data.forEach(function(e4) {
                r3[e4] = { name: e4 };
              }), "function" == typeof (null == e3 ? void 0 : e3.success) && e3.success(t4);
            }, error: function(t4) {
              "function" == typeof (null == e3 ? void 0 : e3.error) && e3.error(t4);
            } };
            return G.debug("Call getBlocklist"), H.call(this, a2, E.GET_BLACK_LIST);
          }
          var Bt = xt, Ht = jt;
          function jt(e3) {
            var t3 = this;
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = { url: this.apiUrl + "/" + n2 + "/" + i2 + "/users/" + this.user + "/contacts/users", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + a2 }, success: function(r3) {
              var o3 = [];
              r3.data.forEach(function(e4) {
                o3.push({ name: e4, subscription: "both", jid: t3.context.jid });
              }), "function" == typeof (null == e3 ? void 0 : e3.success) && e3.success(o3);
            }, error: function(t4) {
              "function" == typeof (null == e3 ? void 0 : e3.error) && e3.error(t4);
            } };
            return G.debug("Call getContacts"), H.call(this, s2, E.GET_CONTACTS);
          }
          function Ft(e3) {
            if ("string" != typeof e3.deviceId || "" === e3.deviceId)
              throw Error('Invalid parameter: "deviceId"');
            if ("string" != typeof e3.deviceToken || "" === e3.deviceToken)
              throw Error('Invalid parameter: "deviceToken"');
            if ("string" != typeof e3.notifierName || "" === e3.notifierName)
              throw Error('Invalid parameter: "notifierName"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(this.user), type: "PUT", data: JSON.stringify({ device_id: e3.deviceId, device_token: e3.deviceToken, notifier_name: e3.notifierName }), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call uploadPushToken", e3), H.call(this, a2, E.UPLOAD_PUSH_TOKEN);
          }
          var Wt = Ft;
          function qt(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(this.user, "/user_channels"), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3 && (null == e3 ? void 0 : e3.success), error: e3 && (null == e3 ? void 0 : e3.error) };
            return G.debug("Call getSessionList"), H.call(this, a2, E.GET_SESSION_LIST);
          }
          function Kt(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = !!(e3 && "number" == typeof e3.pageNum && "number" == typeof e3.pageSize && e3.pageNum > 0 && e3.pageSize > 0), s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(this.user, "/user_channels").concat(a2 ? "/page" : ""), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3 && (null == e3 ? void 0 : e3.success), error: e3 && (null == e3 ? void 0 : e3.error) };
            return a2 && (s2.data = { pageNum: e3.pageNum, pageSize: e3.pageSize }), G.debug("Call getConversationlist"), H.call(this, s2, E.GET_SESSION_LIST).then(function(e4) {
              return function(e5) {
                var t4 = e5.data.channel_infos;
                return null == t4 || t4.forEach(function(e6) {
                  e6.meta && "{}" !== JSON.stringify(e6.meta) ? (e6.meta.payload = JSON.parse(e6.meta.payload), e6.lastMessage = re(e6.meta)) : e6.lastMessage = e6.meta, delete e6.meta;
                }), e5;
              }(e4);
            });
          }
          function Vt(e3) {
            if (e3 && "string" != typeof e3.channel)
              throw Error("Invalid parameter channel: ".concat(e3.channel));
            if (e3 && "singleChat" !== e3.chatType && "groupChat" !== e3.chatType)
              throw Error("Invalid parameter chatType: ".concat(e3.chatType));
            if (e3 && "boolean" != typeof e3.deleteRoam)
              throw Error("Invalid parameter deleteRoam: ".concat(e3.deleteRoam));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken;
            r2 = "singleChat" === e3.chatType ? "chat" : "groupChat";
            var s2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(this.user, "/user_channel"), dataType: "json", type: "DELETE", data: JSON.stringify({ channel: e3.channel, type: r2, delete_roam: e3.deleteRoam }), headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call deleteSession", e3), H.call(this, s2, E.DELETE_SESSION);
          }
          var zt = Vt;
          function Jt(e3, t3) {
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = ["nickname", "avatarurl", "mail", "phone", "gender", "sign", "birth", "ext"], c2 = {};
            if ("undefined" != typeof wx || "undefined" != typeof qq)
              if ("string" == typeof e3 && void 0 !== t3) {
                if (!s2.includes(e3))
                  throw new Error("illegal key, only these keys: nickname, avatarurl, mail, phone, gender, sign, birth, ext are allowed");
                c2[e3] = t3;
              } else {
                if ("[object Object]" !== Object.prototype.toString.call(e3))
                  throw new Error("illegal params");
                s2.forEach(function(t4) {
                  s2.includes(t4) && void 0 !== e3[t4] && (c2[t4] = e3[t4]);
                });
              }
            else if ("string" == typeof e3) {
              if (!s2.includes(e3))
                throw new Error("illegal key, only these keys: nickname, avatarurl, mail, phone, gender, sign, birth, ext are allowed");
              c2 = e3 + "=" + t3;
            } else {
              if ("[object Object]" !== Object.prototype.toString.call(e3))
                throw new Error("illegal params");
              var u2 = [];
              s2.forEach(function(t4) {
                if (s2.includes(t4) && void 0 !== e3[t4]) {
                  var r3 = encodeURIComponent(t4), o3 = encodeURIComponent(e3[t4]);
                  u2.push(r3 + "=" + o3);
                }
              }), c2 = u2.join("&");
            }
            var l2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/metadata/user/").concat(this.user), type: "PUT", data: c2, dataType: "json", headers: { Authorization: "Bearer " + a2, "Content-Type": "application/x-www-form-urlencoded" } };
            return G.debug("Call updateOwnUserInfo", e3), H.call(this, l2, E.UPDATE_USER_INFO);
          }
          var Xt = Jt;
          function Yt(e3, t3) {
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2, n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = [];
            if ("string" == typeof e3)
              c2 = [e3];
            else {
              if ("[object Array]" !== Object.prototype.toString.call(e3))
                throw new Error("illegal params");
              c2 = e3;
            }
            o2 = "string" == typeof t3 ? [t3] : t3 && "[object Array]" === Object.prototype.toString.call(t3) ? t3 : ["nickname", "avatarurl", "mail", "phone", "gender", "sign", "birth", "ext"];
            var u2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/metadata/user/get"), type: "POST", data: JSON.stringify({ targets: c2, properties: o2 }), dataType: "json", headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" } };
            return G.debug("Call fetchUserInfoById", e3), H.call(this, u2, E.GET_USER_INFO);
          }
          function Qt(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(this.user), type: "PUT", dataType: "json", data: JSON.stringify({ nickname: e3 }), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return G.debug("Call updateCurrentUserNick", e3), H.call(this, a2);
          }
          function $t(e3) {
            if ("string" != typeof e3 || "" === e3)
              throw Error('Invalid parameter: "agoraToken"');
            var t3 = this.context, r2 = t3.orgName, o2 = t3.appName, n2 = { url: this.apiUrl + "/" + r2 + "/" + o2 + "/token", dataType: "json", type: "POST", data: JSON.stringify({ grant_type: "agora" }), headers: { Authorization: "Bearer " + e3, "Content-Type": "application/json" } };
            return G.debug("Call getChatToken", e3), H.call(this, n2, E.SDK_INTERNAL);
          }
          function Zt(e3) {
            var t3 = this;
            return new Promise(function(r2, o2) {
              if (!e3.queue)
                throw Error('Invalid parameter: "specified"');
              if (!wt.call(t3)) {
                var n2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
                return Promise.reject(n2);
              }
              (function e4(t4) {
                var n3 = this, i2 = t4.count || 20;
                er.call(this, { count: i2, isGroup: !!t4.isGroup, queue: t4.queue, start: t4.start, format: t4.format, success: function(o3) {
                  if (o3.msgs.length >= i2 || o3.is_last) {
                    var a2 = o3.msgs.splice(0, i2).reverse();
                    t4.success && t4.success(a2), r2(a2);
                  } else
                    e4.call(n3, Lt(Lt({}, t4), { start: null }));
                }, fail: function(e5) {
                  o2(e5), t4.fail && t4.fail(e5);
                } });
              }).call(t3, e3), G.debug("Call fetchHistoryMessages", e3);
            });
          }
          function er(e3) {
            var t3 = this, r2 = e3.queue, o2 = this.mr_cache[r2] || (this.mr_cache[r2] = { msgs: [] }), n2 = this.context.userId, i2 = e3.start || -1, a2 = e3.count || 20;
            if (o2.msgs.length >= a2 || o2.is_last)
              "function" == typeof e3.success && e3.success(o2);
            else {
              o2 && o2.next_key && (i2 = o2.next_key), e3.start && (i2 = e3.start);
              var s2 = { queue: r2 + (e3.isGroup ? "@conference.easemob.com" : "@easemob.com"), start: i2, end: -1 }, c2 = this.context, u2 = c2.orgName, l2 = c2.appName, d2 = { url: this.apiUrl + "/" + u2 + "/" + l2 + "/users/" + n2 + "/messageroaming", dataType: "json", type: "POST", headers: { Authorization: "Bearer " + this.token, "Content-Type": "application/json" }, data: JSON.stringify(s2), success: function(r3) {
                var n3 = null == r3 ? void 0 : r3.data;
                if (!r3.data.msgs)
                  return "function" == typeof e3.success && e3.success(o2), o2.is_last = true, void (o2.next_key = "");
                var i3 = n3.msgs, a3 = i3.length;
                o2.is_last = n3.is_last, o2.next_key = n3.next_key;
                for (var s3 = function(r4) {
                  for (var o3 = [], n4 = 0, i4 = (r4 = ee().atob(r4)).length; n4 < i4; ++n4)
                    o3.push(r4.charCodeAt(n4));
                  var a4 = t3.context.root.lookup("easemob.pb.Meta");
                  if (1 === (a4 = a4.decode(o3)).ns)
                    return ye.call(t3, a4, { errorCode: 0, reason: "" }, true, e3.format);
                }, c3 = 0; c3 < a3; c3++) {
                  var u3 = s3(i3[c3].msg);
                  u3 && o2.msgs.push(u3);
                }
                "function" == typeof e3.success && e3.success(o2);
              }, error: function(e4) {
                if (e4.error && e4.error_description) {
                  var r3 = m.create({ type: p.WEBIM_CONNCTION_AJAX_ERROR, message: "fetch history messages error", data: e4 });
                  t3.onError && t3.onError(r3);
                }
              } };
              H.call(this, d2, E.GET_HISTORY_MSG).catch(function(t4) {
                "function" == typeof e3.fail && e3.fail(t4);
              });
            }
          }
          function tr(e3) {
            var t3 = this;
            return new Promise(function(r2, o2) {
              if ("string" != typeof e3.targetId || "" === e3.targetId)
                throw Error('"Invalid parameter": "targetId"');
              if (!wt.call(t3)) {
                var n2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
                return o2(n2);
              }
              var i2 = t3.context, a2 = i2.orgName, s2 = i2.appName, c2 = i2.userId, u2 = "groupChat" === e3.chatType || "chatRoom" === e3.chatType ? "@conference.easemob.com" : "@easemob.com", l2 = { queue: e3.targetId + u2, start: e3.cursor || -1, pull_number: e3.pageSize || 20, isGroup: "groupChat" === e3.chatType || "chatRoom" === e3.chatType || false, is_positive: "down" === e3.searchDirection, end: -1 }, d2 = { url: t3.apiUrl + "/" + a2 + "/" + s2 + "/users/" + c2 + "/messageroaming", dataType: "json", type: "POST", headers: { Authorization: "Bearer " + t3.token, "Content-Type": "application/json" }, data: JSON.stringify(l2), success: function(e4) {
                for (var o3 = null == e4 ? void 0 : e4.data, n3 = o3.msgs || [], i3 = function(e5) {
                  for (var r3 = [], o4 = 0, n4 = (e5 = ee().atob(e5)).length; o4 < n4; ++o4)
                    r3.push(e5.charCodeAt(o4));
                  var i4 = t3.context.root.lookup("easemob.pb.Meta");
                  if (1 === (i4 = i4.decode(r3)).ns)
                    return ye.call(t3, i4, { errorCode: 0, reason: "" }, true, true);
                }, a3 = [], s3 = 0; s3 < n3.length; s3++) {
                  var c3 = i3(n3[s3].msg);
                  c3 && a3.push(c3);
                }
                o3.msgs = a3;
                var u3 = { cursor: o3.next_key, messages: a3 };
                r2(u3);
              }, error: e3.fail };
              H.call(t3, d2).catch(function(e4) {
                o2(e4);
              }), G.debug("Call getHistoryMessages", e3);
            });
          }
          function rr(e3, t3) {
            var r2 = { id: this.getUniqueId(), to: e3, message: t3 };
            Ie.operatRoster.call(this, r2, "add"), G.debug("Call addContact", r2);
          }
          var or = nr;
          function nr(e3) {
            var t3 = { id: this.getUniqueId(), to: e3 };
            Ie.operatRoster.call(this, t3, "remove"), G.debug("Call deleteContact", t3);
          }
          function ir(e3) {
            var t3 = { id: this.getUniqueId(), to: e3 };
            Ie.operatRoster.call(this, t3, "accept"), G.debug("Call acceptInvitation", t3);
          }
          var ar = ir;
          function sr(e3) {
            var t3 = { id: this.getUniqueId(), to: e3 };
            Ie.operatRoster.call(this, t3, "decline"), G.debug("Call declineContactInvite", t3);
          }
          var cr = sr;
          function ur(e3) {
            Ie.operatRoster.call(this, { to: e3.name }, "ban"), G.debug("Call addUsersToBlocklist", e3);
          }
          var lr = ur, pr = ur;
          function dr(e3) {
            Ie.operatRoster.call(this, { to: e3.name }, "allow"), G.debug("Call removeUserFromBlocklist", e3);
          }
          var hr = dr, fr = dr;
          function mr(e3) {
            var t3 = this.getUniqueId(), r2 = { id: t3, to: e3.to };
            this._msgHash[t3] = Lt({}, r2);
            var o2 = "";
            void 0 !== e3.chatType ? o2 = e3.chatType : void 0 !== e3.type && (o2 = "chat" === e3.type ? "singleChat" : e3.type);
            var n2 = { id: t3, type: "recall", chatType: o2, ackId: e3.mid, to: e3.to, isChatThread: e3.isChatThread || false, success: e3.success, fail: e3.fail };
            return G.debug("Call recallMessage", e3), this.mSync.send(n2, this);
          }
          function gr(e3) {
            return Dt(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2, c2, u2;
              return Gt(this, function(l2) {
                switch (l2.label) {
                  case 0:
                    if ("string" != typeof e3.messageId || !e3.messageId)
                      throw Error("Invalid parameter messageId: ".concat(e3.messageId));
                    if ("string" != typeof e3.reaction || !e3.reaction)
                      throw Error("Invalid parameter reaction: ".concat(e3.reaction));
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.reaction, s2 = e3.messageId, c2 = { msgId: s2, message: a2 }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/reaction/user/").concat(this.user), type: "POST", data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } }, [4, H.call(this, u2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return l2.sent(), [2];
                }
              });
            });
          }
          function Er(e3) {
            return Dt(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2, c2;
              return Gt(this, function(u2) {
                switch (u2.label) {
                  case 0:
                    if ("string" != typeof e3.reaction || !e3.reaction)
                      throw Error("Invalid parameter reactionId: ".concat(e3.reaction));
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.messageId, s2 = e3.reaction, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/reaction/user/").concat(this.user, "?msgId=").concat(a2, "&message=").concat(s2), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } }, [4, H.call(this, c2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return u2.sent(), [2];
                }
              });
            });
          }
          function yr(e3) {
            if ("string" != typeof e3.chatType || !e3.chatType)
              throw Error("Invalid parameter chatType: ".concat(e3.chatType));
            if (!e3.messageId)
              throw Error("Invalid parameter messageId: ".concat(e3.messageId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatType, s2 = e3.messageId, c2 = { msgIdList: "string" == typeof s2 ? [s2] : s2, msgType: "singleChat" === a2 ? "chat" : "groupchat", groupId: e3.groupId || null }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/reaction/user/").concat(this.user), type: "GET", data: c2, dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, u2).then(function(e4) {
              var t4 = e4.data;
              return null == t4 || t4.forEach(function(e5) {
                null == e5 || e5.reactionList.forEach(function(e6) {
                  e6.isAddedBySelf = e6.state, delete e6.state, delete e6.reactionId;
                });
              }), e4;
            });
          }
          var Tr = yr;
          function _r(e3) {
            if ("string" != typeof e3.reaction || !e3.reaction)
              throw Error("Invalid parameter reaction: ".concat(e3.reaction));
            if ("string" != typeof e3.messageId || !e3.messageId)
              throw Error("Invalid parameter messageId: ".concat(e3.messageId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.cursor, s2 = e3.pageSize, c2 = { msgId: e3.messageId, message: e3.reaction, currentPage: a2 || null, pageSize: s2 || 20 }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/reaction/user/").concat(this.user, "/detail"), type: "GET", data: c2, dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, u2).then(function(e4) {
              return e4.data.isAddedBySelf = e4.data.state, delete e4.data.state, delete e4.data.reactionId, e4;
            });
          }
          function vr(e3) {
            return Dt(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2, c2, u2, l2, d2;
              return Gt(this, function(h2) {
                switch (h2.label) {
                  case 0:
                    if ("string" != typeof e3.reportType || !e3.reportType)
                      throw Error("Invalid parameter reportType: ".concat(e3.reportType));
                    if ("string" != typeof e3.messageId || !e3.messageId)
                      throw Error("Invalid parameter messageId: ".concat(e3.messageId));
                    if ("string" != typeof e3.reportReason || !e3.reportReason)
                      throw Error("Invalid parameter messageId: ".concat(e3.reportReason));
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.reportType, s2 = e3.reportReason, c2 = e3.messageId, u2 = { username: this.user, reportType: a2, reportReason: s2 }, l2 = "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/user/").concat(this.user, "/moderation/report/message/").concat(c2), d2 = { url: l2, type: "POST", data: JSON.stringify(u2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } }, [4, H.call(this, d2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return h2.sent(), [2];
                }
              });
            });
          }
          function Or(e3) {
            var t3;
            return Dt(this, void 0, void 0, function() {
              var r2, o2, n2, i2, a2, s2, c2, u2, l2;
              return Gt(this, function(d2) {
                switch (d2.label) {
                  case 0:
                    if ("string" != typeof e3.targetId || "" === e3.targetId)
                      throw Error('"Invalid parameter targetId": ' + e3.targetId);
                    if (!["singleChat", "groupChat"].includes(e3.chatType))
                      throw Error('"Invalid parameter chatType": ' + e3.chatType);
                    if (e3.beforeTimeStamp && ("number" != typeof e3.beforeTimeStamp || e3.beforeTimeStamp < 0 || (null === (t3 = e3.beforeTimeStamp) || void 0 === t3 ? void 0 : t3.toString().length) > 18))
                      throw Error('"Invalid parameter beforeTimeStamp": ' + e3.beforeTimeStamp);
                    if (e3.messageIds && !(Array.isArray(e3.messageIds) && e3.messageIds.length > 0 && e3.messageIds.length <= 20))
                      throw Error('"Invalid parameter messageIds": ' + e3.messageIds);
                    if (!e3.messageIds && !e3.beforeTimeStamp)
                      throw Error("messageIds or beforeTimeStamp field is required.");
                    return wt.call(this) ? (o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.userId, s2 = "singleChat" === e3.chatType ? "userId" : "groupId", c2 = "singleChat" === e3.chatType ? "chat" : "group", u2 = e3.messageIds ? "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/sdk/message/roaming/").concat(c2, "/user/").concat(a2, "?").concat(s2, "=").concat(e3.targetId, "&msgIdList=").concat(e3.messageIds, "&resource=").concat(this.clientResource) : "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/sdk/message/roaming/").concat(c2, "/user/").concat(a2, "/time?").concat(s2, "=").concat(e3.targetId, "&delTime=").concat(e3.beforeTimeStamp, "&&resource=").concat(this.clientResource), l2 = { url: u2, dataType: "json", type: "DELETE", headers: { Authorization: "Bearer " + this.token, "Content-Type": "application/json" } }, G.debug("Call removeHistoryMessages", e3), [4, H.call(this, l2)]) : (r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(r2)]);
                  case 1:
                    return d2.sent(), [2];
                }
              });
            });
          }
          function Rr(e3) {
            if (!e3 || !e3.data)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups?resource=").concat(a2.clientResource), dataType: "json", type: "POST", data: JSON.stringify({ owner: this.user, groupname: e3.data.groupname, desc: e3.data.desc, members: e3.data.members, public: e3.data.public, approval: e3.data.approval, allowinvites: e3.data.allowinvites, invite_need_confirm: e3.data.inviteNeedConfirm, maxusers: e3.data.maxusers, custom: e3.data.ext }), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: function(t4) {
              e3.success && e3.success(t4);
            }, error: e3.error };
            return G.debug("Call createGroup:", e3), H.call(this, s2, E.CREATE_GROUP);
          }
          var Ir = Rr;
          function Sr(e3) {
            var t3;
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = o2.jid, c2 = { entities: [(t3 = {}, t3["notification_ignore_" + e3.groupId] = true, t3)] }, u2 = { type: "PUT", url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(this.user, "?resource=").concat(s2.clientResource), data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call blockGroupMessages", e3), H.call(this, u2, E.BLOCK_GROUP);
          }
          var Cr = Sr;
          function Nr(e3) {
            if ("number" != typeof e3.limit)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { limit: e3.limit, cursor: e3.cursor };
            e3.cursor || delete a2.cursor;
            var s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/publicchatgroups", type: "GET", dataType: "json", data: a2, headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call listGroups", e3), H.call(this, s2, E.LIST_GROUP);
          }
          var Ar = Nr;
          function Mr(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/users/" + this.user + "/joined_chatgroups", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3 && (null == e3 ? void 0 : e3.success), error: e3 && (null == e3 ? void 0 : e3.error) };
            return G.debug("Call getJoinedGroups", e3), H.call(this, a2, E.GET_USER_GROUP);
          }
          function br(e3) {
            if ("number" != typeof e3.pageNum || "number" != typeof e3.pageSize)
              throw Error('Invalid parameter: "pageNum or pageSize"');
            if (e3.pageNum < 0 || e3.pageSize < 0)
              throw Error('"pageNum" should >= 0 and "pageSize" should >= 0');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.needAffiliations || e3.needRole ? "/chatgroups/user/".concat(this.user, "?pagenum=").concat(e3.pageNum, "&pagesize=").concat(e3.pageSize, "&needAffiliations=").concat(e3.needAffiliations, "&needRole=").concat(e3.needRole) : "/users/".concat(this.user, "/joined_chatgroups?pagenum=").concat(e3.pageNum, "&pagesize=").concat(e3.pageSize), s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + a2, dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3 && (null == e3 ? void 0 : e3.success), error: e3 && (null == e3 ? void 0 : e3.error) };
            return G.debug("Call getGroup", e3), H.call(this, s2, E.GET_USER_GROUP).then(function(e4) {
              var t4 = e4.uri, r3 = e4.entities, o3 = [];
              return t4.includes("joined_chatgroups") || (r3.forEach(function(e5) {
                var t5 = { affiliationsCount: e5.affiliations_count, groupName: e5.name, groupId: e5.groupId, role: e5.permission, disabled: e5.disabled, approval: e5.membersonly, allowInvites: e5.allowinvites, description: e5.description, maxUsers: e5.maxusers, public: e5.public };
                o3.push(t5);
              }), e4.entities = o3), e4;
            });
          }
          function Ur(e3) {
            if ("string" != typeof e3.groupId || "string" != typeof e3.newOwner)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { newowner: e3.newOwner }, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = o2.jid, c2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/chatgroups/").concat(e3.groupId, "?resource=").concat(s2.clientResource), type: "PUT", dataType: "json", headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, data: JSON.stringify(r2), success: e3.success, error: e3.error };
            return G.debug("Call changeOwner", e3), H.call(this, c2, E.CHANGE_OWNER);
          }
          var wr = Ur;
          function kr(e3) {
            if ("string" != typeof e3.groupId && !Array.isArray(e3.groupId))
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + e3.groupId + "?joined_time=true", type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupInfo", e3), H.call(this, a2, E.GET_GROUP_INFO);
          }
          function Pr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { groupname: e3.groupName, description: e3.description, custom: e3.ext }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "?resource=").concat(a2.clientResource), type: "PUT", data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call modifyGroup", e3), H.call(this, u2, E.MODIFY_GROUP);
          }
          function Lr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (isNaN(e3.pageNum) || e3.pageNum <= 0)
              throw Error('The parameter "pageNum" should be a positive number');
            if (isNaN(e3.pageSize) || e3.pageSize <= 0)
              throw Error('The parameter "pageSize" should be a positive number');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { pagenum: e3.pageNum, pagesize: e3.pageSize }, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = { url: this.apiUrl + "/" + n2 + "/" + i2 + "/chatgroups/" + e3.groupId + "/users", dataType: "json", type: "GET", data: r2, headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call listGroupMember", e3), H.call(this, s2, E.LIST_GROUP_MEMBER);
          }
          var Dr = Lr;
          function Gr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + a2 + "/admin", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupAdmin", e3), H.call(this, s2, E.GET_GROUP_ADMIN);
          }
          function xr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { newadmin: e3.username }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/admin?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call setGroupAdmin", e3), H.call(this, u2, E.SET_GROUP_ADMIN);
          }
          var Br = xr;
          function Hr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/admin/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeAdmin", e3), H.call(this, u2, E.REMOVE_GROUP_ADMIN);
          }
          var jr = Hr;
          function Fr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "?version=v3&resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call destroyGroup", e3), H.call(this, c2, E.DISSOLVE_GROUP);
          }
          var Wr = Fr;
          function qr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/quit?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call quitGroup", e3), H.call(this, c2, E.QUIT_GROUP);
          }
          var Kr = qr;
          function Vr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(e3.users))
              throw Error('Invalid parameter: "users"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = e3.groupId, o2 = { usernames: e3.users }, n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = n2.jid, u2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/chatgroups/").concat(r2, "/invite?resource=").concat(c2.clientResource), type: "POST", data: JSON.stringify(o2), dataType: "json", headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call inviteUsersToGroup", e3), H.call(this, u2, E.INVITE_TO_GROUP);
          }
          var zr = Vr;
          function Jr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(e3.groupId, "/apply?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify({ message: e3.message || "" }), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call joinGroup", e3), H.call(this, s2, E.JOIN_GROUP);
          }
          function Xr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.applicant || "" === e3.applicant)
              throw Error('Invalid parameter: "applicant"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { applicant: e3.applicant, verifyResult: true, reason: "no clue" }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/apply_verify?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call agreeJoinGroup", e3), H.call(this, u2, E.AGREE_JOIN_GROUP);
          }
          var Yr = Xr;
          function Qr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.applicant || "" === e3.applicant)
              throw Error('Invalid parameter: "applicant"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { applicant: e3.applicant, verifyResult: false, reason: e3.reason || "" }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/apply_verify?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call rejectGroupJoinRequest", e3), H.call(this, u2, E.REJECT_JOIN_GROUP);
          }
          var $r = Qr;
          function Zr(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.invitee || "" === e3.invitee)
              throw Error('Invalid parameter: "invitee"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { invitee: e3.invitee, verifyResult: true }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/invite_verify?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call acceptGroupInvite", e3), H.call(this, u2, E.AGREE_INVITE_GROUP);
          }
          var eo = Zr;
          function to(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.invitee || "" === e3.invitee)
              throw Error('Invalid parameter: "invitee"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { invitee: e3.invitee, verifyResult: false }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/invite_verify?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call rejectGroupInvite", e3), H.call(this, u2, E.REJECT_INVITE_GROUP);
          }
          var ro = to;
          function oo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = e3.groupId, o2 = e3.username, n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = n2.jid, u2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/chatgroups/").concat(r2, "/users/").concat(o2, "?resource=").concat(c2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeGroupMember", e3), H.call(this, u2, E.REMOVE_GROUP_MEMBER);
          }
          var no = oo;
          function io(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(e3.users))
              throw Error('Invalid parameter: "users"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.users.join(","), u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeGroupMembers", e3), H.call(this, u2, E.MULTI_REMOVE_GROUP_MEMBER);
          }
          var ao = io;
          function so(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!(Array.isArray(e3.username) || "string" == typeof e3.username && "" !== e3.username))
              throw Error('Invalid parameter: "username"');
            if ("number" != typeof e3.muteDuration)
              throw Error('Invalid parameter: "muteDuration"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { usernames: "string" == typeof e3.username ? [e3.username] : e3.username, mute_duration: e3.muteDuration }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/mute?resource=").concat(a2.clientResource), dataType: "json", type: "POST", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, data: JSON.stringify(c2), success: e3.success, error: e3.error };
            return G.debug("Call muteGroupMember", e3), H.call(this, u2, E.MUTE_GROUP_MEMBER);
          }
          var co = so;
          function uo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!(Array.isArray(e3.username) || "string" == typeof e3.username && "" !== e3.username))
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/mute/").concat(c2, "?resource=").concat(a2.clientResource), dataType: "json", type: "DELETE", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unmuteGroupMember", e3), H.call(this, u2, E.UNMUTE_GROUP_MEMBER);
          }
          var lo = uo;
          function po(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + a2 + "/mute", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupMuteList", e3), H.call(this, s2, E.GET_GROUP_MUTE_LIST);
          }
          var ho = po, fo = po;
          function mo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call blockGroupMember", e3), H.call(this, u2, E.BLOCK_GROUP_MEMBER);
          }
          var go = mo;
          function Eo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { usernames: e3.usernames }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/blocks/users?resource=").concat(a2.clientResource), data: JSON.stringify(c2), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call blockGroupMembers", e3), H.call(this, u2, E.BLOCK_GROUP_MEMBERS);
          }
          var yo = Eo;
          function To(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unblockGroupMember", e3), H.call(this, u2, E.UNBLOCK_GROUP_MEMBER);
          }
          var _o = To;
          function vo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.usernames.join(","), u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unblockGroupMembers", e3), H.call(this, u2, E.UNBLOCK_GROUP_MEMBERS);
          }
          var Oo = vo;
          function Ro(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + a2 + "/blocks/users", type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupBlacklist", e3), H.call(this, s2, E.GET_GROUP_BLACK_LIST);
          }
          var Io = Ro, So = Ro;
          function Co(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/ban?resource=").concat(a2.clientResource), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call disableSendGroupMsg", e3), H.call(this, c2, E.DISABLED_SEND_GROUP_MSG);
          }
          function No(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/ban?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call enableSendGroupMsg", e3), H.call(this, c2, E.ENABLE_SEND_GROUP_MSG);
          }
          function Ao(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(e3.users))
              throw Error('Invalid parameter: "users"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { usernames: e3.users }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/white/users?resource=").concat(a2.clientResource), type: "POST", data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call addUsersToGroupWhitelist", e3), H.call(this, u2, E.ADD_USERS_TO_GROUP_WHITE);
          }
          var Mo = Ao;
          function bo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.userName || "" === e3.userName)
              throw Error('Invalid parameter: "userName"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/white/users/").concat(e3.userName, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeGroupAllowlistMember", e3), H.call(this, c2, E.REMOVE_GROUP_WHITE_MEMBER);
          }
          var Uo = bo, wo = bo;
          function ko(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + a2 + "/white/users", type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupAllowlist", e3), H.call(this, s2, E.GET_GROUP_WHITE_LIST);
          }
          var Po = ko;
          function Lo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.userName || "" === e3.userName)
              throw Error('Invalid parameter: "userName"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + a2 + "/white/users/" + e3.userName, type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call isInGroupAllowlist", e3), H.call(this, s2, E.IS_IN_GROUP_WHITE_LIST);
          }
          var Do = Lo, Go = Lo;
          function xo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.userId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/sdk/group/" + e3.groupId + "/mute/" + a2, dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2 } };
            return G.debug("Call isInGroupMutelist", e3), H.call(this, s2).then(function(e4) {
              return e4.data;
            });
          }
          function Bo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.msgId || "" === e3.msgId)
              throw Error('Invalid parameter: "msgId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatgroups/" + e3.groupId + "/acks/" + e3.msgId, dataType: "json", type: "GET", data: { limit: 500, key: void 0 }, headers: { Authorization: "Bearer " + i2 }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupMsgReadUser", e3), H.call(this, a2, E.GET_GROUP_MSG_READ_USER);
          }
          function Ho(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.groupId, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(a2, "/announcement"), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call fetchGroupAnnouncement", e3), H.call(this, s2, E.GET_GROUP_ANN);
          }
          function jo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.announcement)
              throw Error('Invalid parameter: "announcement"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = { announcement: e3.announcement }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/announcement?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call updateGroupAnnouncement", e3), H.call(this, u2, E.UPDATE_GROUP_ANN);
          }
          function Fo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("object" != typeof e3.file)
              throw Error('Invalid parameter: "file"');
            if (wt.call(this)) {
              var t3 = this.context, r2 = t3.orgName, o2 = t3.appName, n2 = t3.accessToken, i2 = t3.jid, a2 = e3.groupId;
              X.call(this, { uploadUrl: "".concat(this.apiUrl, "/").concat(r2, "/").concat(o2, "/chatgroups/").concat(a2, "/share_files?resource=").concat(i2.clientResource), onFileUploadProgress: e3.onFileUploadProgress, onFileUploadComplete: e3.onFileUploadComplete, onFileUploadError: e3.onFileUploadError, onFileUploadCanceled: e3.onFileUploadCanceled, accessToken: n2, apiUrl: this.apiUrl, file: e3.file, appKey: this.context.appKey }, E.UPLOAD_GROUP_FILE), G.debug("Call uploadGroupSharedFile", e3);
            }
          }
          function Wo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.fileId || "" === e3.fileId)
              throw Error('Invalid parameter: "file"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.groupId, c2 = e3.fileId, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(s2, "/share_files/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call deleteGroupSharedFile", e3), H.call(this, u2, E.DELETE_GROUP_FILE);
          }
          function qo(e3) {
            if ("string" != typeof e3.groupId || "" === e3.groupId)
              throw Error('Invalid parameter: "groupId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.pageNum || 1, s2 = e3.pageSize || 10, c2 = e3.groupId, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatgroups/").concat(c2, "/share_files?pagenum=").concat(a2, "&pagesize=").concat(s2), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getGroupSharedFilelist", e3), H.call(this, u2, E.GET_GROUP_FILE_LIST);
          }
          var Ko = qo;
          function Vo(e3) {
            var t3 = this.context, r2 = t3.orgName, o2 = t3.appName, n2 = t3.accessToken, i2 = this.apiUrl, a2 = e3.groupId, s2 = e3.fileId;
            Y.call(this, { url: "".concat(i2, "/").concat(r2, "/").concat(o2, "/chatgroups/").concat(a2, "/share_files/").concat(s2), onFileDownloadComplete: e3.onFileDownloadComplete, onFileDownloadError: e3.onFileDownloadError, accessToken: n2, id: s2, secret: e3.secret }, E.DOWN_GROUP_FILE), G.debug("Call downloadGroupSharedFile", e3);
          }
          function zo(e3) {
            return t3 = this, r2 = void 0, n2 = function() {
              var t4, r3, o3, n3, i2, a2, s2, c2, u2, l2, d2;
              return function(e4, t5) {
                var r4, o4, n4, i3, a3 = { label: 0, sent: function() {
                  if (1 & n4[0])
                    throw n4[1];
                  return n4[1];
                }, trys: [], ops: [] };
                return i3 = { next: s3(0), throw: s3(1), return: s3(2) }, "function" == typeof Symbol && (i3[Symbol.iterator] = function() {
                  return this;
                }), i3;
                function s3(i4) {
                  return function(s4) {
                    return function(i5) {
                      if (r4)
                        throw new TypeError("Generator is already executing.");
                      for (; a3; )
                        try {
                          if (r4 = 1, o4 && (n4 = 2 & i5[0] ? o4.return : i5[0] ? o4.throw || ((n4 = o4.return) && n4.call(o4), 0) : o4.next) && !(n4 = n4.call(o4, i5[1])).done)
                            return n4;
                          switch (o4 = 0, n4 && (i5 = [2 & i5[0], n4.value]), i5[0]) {
                            case 0:
                            case 1:
                              n4 = i5;
                              break;
                            case 4:
                              return a3.label++, { value: i5[1], done: false };
                            case 5:
                              a3.label++, o4 = i5[1], i5 = [0];
                              continue;
                            case 7:
                              i5 = a3.ops.pop(), a3.trys.pop();
                              continue;
                            default:
                              if (!((n4 = (n4 = a3.trys).length > 0 && n4[n4.length - 1]) || 6 !== i5[0] && 2 !== i5[0])) {
                                a3 = 0;
                                continue;
                              }
                              if (3 === i5[0] && (!n4 || i5[1] > n4[0] && i5[1] < n4[3])) {
                                a3.label = i5[1];
                                break;
                              }
                              if (6 === i5[0] && a3.label < n4[1]) {
                                a3.label = n4[1], n4 = i5;
                                break;
                              }
                              if (n4 && a3.label < n4[2]) {
                                a3.label = n4[2], a3.ops.push(i5);
                                break;
                              }
                              n4[2] && a3.ops.pop(), a3.trys.pop();
                              continue;
                          }
                          i5 = t5.call(e4, a3);
                        } catch (e5) {
                          i5 = [6, e5], o4 = 0;
                        } finally {
                          r4 = n4 = 0;
                        }
                      if (5 & i5[0])
                        throw i5[1];
                      return { value: i5[0] ? i5[1] : void 0, done: true };
                    }([i4, s4]);
                  };
                }
              }(this, function(h2) {
                switch (h2.label) {
                  case 0:
                    if (t4 = e3.groupId, r3 = e3.userId, o3 = e3.memberAttributes, "string" != typeof t4 || "" === t4)
                      throw Error('Invalid parameter: "groupId"');
                    if ("string" != typeof r3 || "" === r3)
                      throw Error('Invalid parameter: "userId"');
                    if ("object" != typeof o3)
                      throw Error('Invalid parameter: "memberAttributes"');
                    return wt.call(this) ? (i2 = this.context, a2 = i2.orgName, s2 = i2.appName, c2 = i2.accessToken, u2 = i2.jid, l2 = { metaData: o3 }, d2 = { url: "".concat(this.apiUrl, "/").concat(a2, "/").concat(s2, "/sdk/metadata/chatgroup/").concat(t4, "/user/").concat(r3, "?resource=").concat(u2.clientResource), type: "PUT", dataType: "json", data: JSON.stringify(l2), headers: { Authorization: "Bearer " + c2, "Content-Type": "application/json" } }, G.debug("Call setGroupMemberAttributes", e3), [4, H.call(this, d2, E.SET_GROUP_MEMBER_ATTRS)]) : (n3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(n3)]);
                  case 1:
                    return h2.sent(), [2];
                }
              });
            }, new ((o2 = void 0) || (o2 = Promise))(function(e4, i2) {
              function a2(e5) {
                try {
                  c2(n2.next(e5));
                } catch (e6) {
                  i2(e6);
                }
              }
              function s2(e5) {
                try {
                  c2(n2.throw(e5));
                } catch (e6) {
                  i2(e6);
                }
              }
              function c2(t4) {
                var r3;
                t4.done ? e4(t4.value) : (r3 = t4.value, r3 instanceof o2 ? r3 : new o2(function(e5) {
                  e5(r3);
                })).then(a2, s2);
              }
              c2((n2 = n2.apply(t3, r2 || [])).next());
            });
            var t3, r2, o2, n2;
          }
          function Jo(e3) {
            var t3 = e3.groupId, r2 = e3.userId;
            return Xo.call(this, { groupId: t3, userIds: [r2] }).then(function(e4) {
              var t4;
              return { type: e4.type, data: null === (t4 = e4.data) || void 0 === t4 ? void 0 : t4[r2] };
            });
          }
          function Xo(e3) {
            var t3 = e3.groupId, r2 = e3.userIds, o2 = e3.keys, n2 = void 0 === o2 ? [] : o2;
            if ("string" != typeof t3 || "" === t3)
              throw Error('Invalid parameter: "groupId"');
            if (!Array.isArray(r2) || (null == r2 ? void 0 : r2.length) <= 0)
              throw Error('Invalid parameter: "userIds"');
            if (!Array.isArray(n2))
              throw Error('Invalid parameter: "keys"');
            if (!wt.call(this)) {
              var i2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(i2);
            }
            var a2 = this.context, s2 = a2.orgName, c2 = a2.appName, u2 = a2.accessToken, l2 = { targets: r2, properties: n2 }, d2 = { url: "".concat(this.apiUrl, "/").concat(s2, "/").concat(c2, "/sdk/metadata/chatgroup/").concat(t3, "/get"), type: "POST", dataType: "json", data: JSON.stringify(l2), headers: { Authorization: "Bearer " + u2, "Content-Type": "application/json" } };
            return G.debug("Call getGroupMembersAttributes", e3), H.call(this, d2, E.GET_GROUP_MEMBER_ATTR).then(function(e4) {
              return { type: e4.type, data: (null == e4 ? void 0 : e4.data) || {} };
            });
          }
          function Yo(e3) {
            var t3 = this;
            if ("number" != typeof e3.pagenum || "number" != typeof e3.pagesize)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2 = { pagenum: e3.pagenum || 1, pagesize: e3.pagesize || 20 }, n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = { url: this.apiUrl + "/" + i2 + "/" + a2 + "/chatrooms", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + s2 }, data: o2, success: function(t4) {
              "function" == typeof e3.success && e3.success(t4);
            }, error: function(r3) {
              r3.error && r3.error_description && t3.onError && t3.onError({ type: p.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR, message: r3.error_description, data: r3 }), "function" == typeof e3.error && e3.error(r3);
            } };
            return G.debug("Call getChatRooms", e3), H.call(this, c2, E.GET_CHATROOM_LIST);
          }
          function Qo(e3) {
            if ("string" != typeof e3.name)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { name: e3.name, description: e3.description, maxusers: e3.maxusers, owner: this.user, members: e3.members }, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = (o2.accessToken, o2.jid), s2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/chatrooms?resource=").concat(a2.clientResource), dataType: "json", type: "POST", data: JSON.stringify(r2), headers: { Authorization: "Bearer " + e3.token || 0, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call createChatRoom", e3), H.call(this, s2, E.CREATE_CHATROOM);
          }
          function $o(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = (r2.accessToken, r2.jid), a2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(e3.chatRoomId, "?resource=").concat(i2.clientResource), dataType: "json", type: "DELETE", headers: { Authorization: "Bearer " + e3.token || 0 }, success: e3.success, error: e3.error };
            return G.debug("Call destroyChatRoom", e3), H.call(this, a2, E.DESTROY_CHATROOM);
          }
          function Zo(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + e3.chatRoomId, dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getChatRoomDetails", e3), H.call(this, a2, E.GET_CHATROOM_DETAIL);
          }
          function en(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { groupname: e3.chatRoomName, description: e3.description, maxusers: e3.maxusers }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "?resource=").concat(a2.clientResource), type: "PUT", data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call modifyChatRoom", e3), H.call(this, u2, E.MODIFY_CHATROOM);
          }
          function tn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId || "string" != typeof e3.username)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeChatRoomMember", e3), H.call(this, u2, E.REMOVE_CHATROOM_MEMBER);
          }
          var rn = tn;
          function on(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId || !Array.isArray(e3.users))
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = e3.chatRoomId, o2 = e3.users.join(","), n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = n2.jid, u2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/chatrooms/").concat(r2, "/users/").concat(o2, "?resource=").concat(c2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeChatRoomMembers", e3), H.call(this, u2, E.MULTI_REMOVE_CHATROOM_MEMBER);
          }
          var nn = on;
          function an(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId || !Array.isArray(e3.users))
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = e3.chatRoomId, o2 = { usernames: e3.users }, n2 = this.context, i2 = n2.orgName, a2 = n2.appName, s2 = n2.accessToken, c2 = n2.jid, u2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/chatrooms/").concat(r2, "/users?resource=").concat(c2.clientResource), type: "POST", data: JSON.stringify(o2), dataType: "json", headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call addUsersToChatRoom", e3), H.call(this, u2, E.ADD_USERS_TO_CHATROOM);
          }
          function sn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            return G.debug("Call joinChatRoom", e3), this.mSync.handleChatRoom(e3, "join");
          }
          function cn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error("Invalid parameter");
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            return G.debug("Call leaveChatRoom", e3), this.mSync.handleChatRoom(e3, "leave");
          }
          var un = cn;
          function ln(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (isNaN(e3.pageNum) || e3.pageNum <= 0)
              throw Error('The parameter "pageNum" should be a positive number');
            if (isNaN(e3.pageSize) || e3.pageSize <= 0)
              throw Error('The parameter "pageSize" should be a positive number');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { pagenum: e3.pageNum, pagesize: e3.pageSize }, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = { url: this.apiUrl + "/" + n2 + "/" + i2 + "/chatrooms/" + e3.chatRoomId + "/users", dataType: "json", type: "GET", data: r2, headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call listChatRoomMembers", e3), H.call(this, s2, E.LIST_CHATROOM_MEMBERS);
          }
          var pn = ln;
          function dn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatRoomId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + a2 + "/admin", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getChatRoomAdmin", e3), H.call(this, s2, E.GET_CHATROOM_ADMIN);
          }
          function hn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { newadmin: e3.username }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/admin?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call setChatRoomAdmin", e3), H.call(this, u2, E.SET_CHATROOM_ADMIN);
          }
          function fn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/admin/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeChatRoomAdmin", e3), H.call(this, u2, E.REMOVE_CHATROOM_ADMIN);
          }
          function mn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "groupId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if ("number" != typeof e3.muteDuration)
              throw Error('Invalid parameter: "muteDuration"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { usernames: [e3.username], mute_duration: e3.muteDuration }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/mute?resource=").concat(a2.clientResource), dataType: "json", type: "POST", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, data: JSON.stringify(c2), success: e3.success, error: e3.error };
            return G.debug("Call muteChatRoomMember", e3), H.call(this, u2, E.MUTE_CHATROOM_MEMBER);
          }
          function gn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/mute/").concat(c2, "?resource=").concat(a2.clientResource), dataType: "json", type: "DELETE", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unmuteChatRoomMember", e3), H.call(this, u2, E.REMOVE_MUTE_CHATROOM_MEMBER);
          }
          var En = gn;
          function yn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatRoomId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + a2 + "/mute", dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getChatRoomMutelist", e3), H.call(this, s2, E.GET_MUTE_CHATROOM_MEMBERS);
          }
          var Tn = yn, _n = yn;
          function vn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call blockChatRoomMember", e3), H.call(this, u2, E.SET_CHATROOM_MEMBER_TO_BLACK);
          }
          var On = vn;
          function Rn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { usernames: e3.usernames }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/blocks/users?resource=").concat(a2.clientResource), data: JSON.stringify(c2), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Chat blockChatRoomMembers:", u2), H.call(this, u2, E.MULTI_SET_CHATROOM_MEMBER_TO_BLACK);
          }
          var In = Rn;
          function Sn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error('Invalid parameter: "username"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.username, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unblockChatRoomMember", e3), H.call(this, u2, E.REMOVE_CHATROOM_MEMBER_BLACK);
          }
          var Cn = Sn;
          function Nn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = e3.usernames.join(","), u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/blocks/users/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call unblockChatRoomMembers", e3), H.call(this, u2, E.MULTI_REMOVE_CHATROOM_MEMBER_BLACK);
          }
          var An = Nn;
          function Mn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatRoomId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + a2 + "/blocks/users", type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getChatRoomBlocklist", e3), H.call(this, s2, E.GET_CHATROOM_BLOCK_MEMBERS);
          }
          var bn = Mn, Un = Mn;
          function wn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/ban?resource=").concat(a2.clientResource), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call disableSendChatRoomMsg", e3), H.call(this, c2, E.DISABLED_CHATROOM_SEND_MSG);
          }
          function kn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/ban?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call enableSendChatRoomMsg", e3), H.call(this, c2, E.ENABLE_CHATROOM_SEND_MSG);
          }
          function Pn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!Array.isArray(e3.users))
              throw Error('Invalid parameter: "users"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { usernames: e3.users }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/white/users?resource=").concat(a2.clientResource), type: "POST", data: JSON.stringify(c2), dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call addUsersToChatRoomWhitelist", e3), H.call(this, u2, E.ADD_USERS_TO_CHATROOM);
          }
          var Ln = Pn;
          function Dn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.userName || "" === e3.userName)
              throw Error('Invalid parameter: "userName"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.chatRoomId, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/white/users/").concat(e3.userName, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call removeChatRoomAllowlistMember", e3), H.call(this, c2, E.REMOVE_CHATROOM_WHITE_USERS);
          }
          var Gn = Dn, xn = Dn;
          function Bn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatRoomId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + a2 + "/white/users", type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getChatRoomAllowlist", e3), H.call(this, s2, E.GET_CHATROOM_WHITE_USERS);
          }
          var Hn = Bn;
          function jn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if ("string" != typeof e3.userName || "" === e3.userName)
              throw Error('Invalid parameter: "userName"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.chatRoomId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/chatrooms/" + a2 + "/white/users/" + e3.userName, type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call isInChatRoomAllowlist", e3), H.call(this, s2, E.CHECK_CHATROOM_WHITE_USER);
          }
          var Fn = jn;
          function Wn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error('Invalid parameter: "chatRoomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.userId, s2 = { url: this.apiUrl + "/" + o2 + "/" + n2 + "/sdk/chatrooms/" + e3.chatRoomId + "/mute/" + a2, dataType: "json", type: "GET", headers: { Authorization: "Bearer " + i2 } };
            return G.debug("Call isInChatRoomMutelist", e3), H.call(this, s2).then(function(e4) {
              return e4.data;
            });
          }
          function qn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error('Invalid parameter: "roomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.roomId, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(a2, "/announcement"), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call fetchChatRoomAnnouncement", e3), H.call(this, s2, E.GET_CHATROOM_ANN);
          }
          function Kn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error('Invalid parameter: "roomId"');
            if ("string" != typeof e3.announcement)
              throw Error('Invalid parameter: "announcement"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.roomId, c2 = { announcement: e3.announcement }, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/announcement?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call updateChatRoomAnnouncement:", e3), H.call(this, u2, E.UPDATE_CHATROOM_ANN);
          }
          function Vn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error('Invalid parameter: "roomId"');
            if ("object" != typeof e3.file)
              throw Error('Invalid parameter: "file"');
            if (wt.call(this)) {
              var t3 = this.context, r2 = t3.orgName, o2 = t3.appName, n2 = t3.accessToken, i2 = t3.jid, a2 = e3.roomId;
              X.call(this, { uploadUrl: "".concat(this.apiUrl, "/").concat(r2, "/").concat(o2, "/chatrooms/").concat(a2, "/share_files?resource=").concat(i2.clientResource), onFileUploadProgress: e3.onFileUploadProgress, onFileUploadComplete: e3.onFileUploadComplete, onFileUploadError: e3.onFileUploadError, onFileUploadCanceled: e3.onFileUploadCanceled, accessToken: n2, apiUrl: this.apiUrl, file: e3.file, appKey: this.context.appKey }, E.UPLOAD_CHATROOM_FILE), G.debug("Call uploadChatRoomSharedFile", e3);
            }
          }
          function zn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error('Invalid parameter: "roomId"');
            if ("string" != typeof e3.fileId || "" === e3.fileId)
              throw Error('Invalid parameter: "fileId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = e3.roomId, c2 = e3.fileId, u2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(s2, "/share_files/").concat(c2, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call deleteChatRoomSharedFile", e3), H.call(this, u2, E.DELETE_CHATROOM_FILE);
          }
          function Jn(e3) {
            if ("string" != typeof e3.roomId || "" === e3.roomId)
              throw Error('Invalid parameter: "roomId"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = e3.roomId, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/chatrooms/").concat(a2, "/share_files"), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json", accept: "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call fetchChatRoomSharedFileList", e3), H.call(this, s2, E.GET_CHATROOM_FILES);
          }
          var Xn = Jn;
          function Yn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter chatRoomId: " + e3.chatRoomId);
            if (e3.attributeKeys && !Array.isArray(e3.attributeKeys))
              throw Error('"Invalid parameter attributeKeys": ' + e3.attributeKeys);
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = (r2.jid, e3.chatRoomId), s2 = { keys: e3.attributeKeys }, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/metadata/chatroom/").concat(a2), type: "POST", dataType: "json", data: JSON.stringify(s2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return G.debug("Call getChatRoomAttributes:", e3), H.call(this, c2, E.GET_CHATROOM_ATTR).then(function(e4) {
              return { data: e4.data, type: e4.type };
            });
          }
          function Qn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter chatRoomId: " + e3.chatRoomId);
            if ("object" != typeof e3.attributes)
              throw Error("Invalid parameter attributes: " + e3.attributes);
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.userId, s2 = e3.chatRoomId, c2 = e3.attributes, u2 = e3.autoDelete, l2 = void 0 === u2 || u2, d2 = e3.isForced ? "/forced" : "", h2 = { metaData: c2, autoDelete: l2 ? "DELETE" : "NO_DELETE" }, f2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/metadata/chatroom/").concat(s2, "/user/").concat(a2) + d2, type: "PUT", dataType: "json", data: JSON.stringify(h2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return G.debug("Call setChatRoomAttributes:", e3), H.call(this, f2, E.SET_CHATROOM_ATTR).then(function(e4) {
              return kt(e4);
            });
          }
          function $n(e3) {
            var t3;
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter chatRoomId: " + e3.chatRoomId);
            if ("string" != typeof e3.attributeKey || "" === e3.attributeKey)
              throw Error("Invalid parameter attributeKey: " + e3.attributeKey);
            if ("string" != typeof e3.attributeValue || "" === e3.attributeValue)
              throw Error("Invalid parameter attributeValue: " + e3.attributeValue);
            if (!wt.call(this)) {
              var r2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(r2);
            }
            var o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.accessToken, s2 = o2.userId, c2 = e3.chatRoomId, u2 = e3.attributeKey, l2 = e3.attributeValue, d2 = e3.autoDelete, h2 = void 0 === d2 || d2, f2 = e3.isForced ? "/forced" : "", g2 = { metaData: (t3 = {}, t3[u2] = l2, t3), autoDelete: h2 ? "DELETE" : "NO_DELETE" }, y2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/metadata/chatroom/").concat(c2, "/user/").concat(s2) + f2, type: "PUT", dataType: "json", data: JSON.stringify(g2), headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" } };
            return G.debug("Call setChatRoomAttribute:", e3), H.call(this, y2, E.SET_CHATROOM_ATTR).then(function(e4) {
              var t4 = Pt(e4);
              if (t4)
                throw t4;
            });
          }
          function Zn(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter chatRoomId: " + e3.chatRoomId);
            if (!Array.isArray(e3.attributeKeys))
              throw Error('"Invalid parameter attributes": ' + e3.attributeKeys);
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.userId, s2 = e3.chatRoomId, c2 = e3.attributeKeys, u2 = e3.isForced ? "/forced" : "", l2 = { keys: c2 }, d2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/metadata/chatroom/").concat(s2, "/user/").concat(a2) + u2, type: "DELETE", dataType: "json", data: JSON.stringify(l2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return G.debug("Call removeChatRoomAttributes:", e3), H.call(this, d2, E.DELETE_CHATROOM_ATTR).then(function(e4) {
              return kt(e4);
            });
          }
          function ei(e3) {
            if ("string" != typeof e3.chatRoomId || "" === e3.chatRoomId)
              throw Error("Invalid parameter chatRoomId: " + e3.chatRoomId);
            if ("string" != typeof e3.attributeKey || "" === e3.attributeKey)
              throw Error('"Invalid parameter attributeKey": ' + e3.attributeKey);
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.userId, s2 = e3.chatRoomId, c2 = e3.attributeKey, u2 = e3.isForced ? "/forced" : "", l2 = { keys: [c2] }, d2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/metadata/chatroom/").concat(s2, "/user/").concat(a2) + u2, type: "DELETE", dataType: "json", data: JSON.stringify(l2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return G.debug("Call removeChatRoomAttribute:", e3), H.call(this, d2, E.DELETE_CHATROOM_ATTR).then(function(e4) {
              var t4 = Pt(e4);
              if (t4)
                throw t4;
            });
          }
          var ti = function(e3, t3, r2, o2) {
            return new (r2 || (r2 = Promise))(function(n2, i2) {
              function a2(e4) {
                try {
                  c2(o2.next(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function s2(e4) {
                try {
                  c2(o2.throw(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function c2(e4) {
                var t4;
                e4.done ? n2(e4.value) : (t4 = e4.value, t4 instanceof r2 ? t4 : new r2(function(e5) {
                  e5(t4);
                })).then(a2, s2);
              }
              c2((o2 = o2.apply(e3, t3 || [])).next());
            });
          }, ri = function(e3, t3) {
            var r2, o2, n2, i2, a2 = { label: 0, sent: function() {
              if (1 & n2[0])
                throw n2[1];
              return n2[1];
            }, trys: [], ops: [] };
            return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
              return this;
            }), i2;
            function s2(i3) {
              return function(s3) {
                return function(i4) {
                  if (r2)
                    throw new TypeError("Generator is already executing.");
                  for (; a2; )
                    try {
                      if (r2 = 1, o2 && (n2 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((n2 = o2.return) && n2.call(o2), 0) : o2.next) && !(n2 = n2.call(o2, i4[1])).done)
                        return n2;
                      switch (o2 = 0, n2 && (i4 = [2 & i4[0], n2.value]), i4[0]) {
                        case 0:
                        case 1:
                          n2 = i4;
                          break;
                        case 4:
                          return a2.label++, { value: i4[1], done: false };
                        case 5:
                          a2.label++, o2 = i4[1], i4 = [0];
                          continue;
                        case 7:
                          i4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!((n2 = (n2 = a2.trys).length > 0 && n2[n2.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === i4[0] && (!n2 || i4[1] > n2[0] && i4[1] < n2[3])) {
                            a2.label = i4[1];
                            break;
                          }
                          if (6 === i4[0] && a2.label < n2[1]) {
                            a2.label = n2[1], n2 = i4;
                            break;
                          }
                          if (n2 && a2.label < n2[2]) {
                            a2.label = n2[2], a2.ops.push(i4);
                            break;
                          }
                          n2[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      i4 = t3.call(e3, a2);
                    } catch (e4) {
                      i4 = [6, e4], o2 = 0;
                    } finally {
                      r2 = n2 = 0;
                    }
                  if (5 & i4[0])
                    throw i4[1];
                  return { value: i4[0] ? i4[1] : void 0, done: true };
                }([i3, s3]);
              };
            }
          };
          function oi(e3) {
            return ti(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2, c2, u2;
              return ri(this, function(l2) {
                switch (l2.label) {
                  case 0:
                    if ("string" != typeof e3.description)
                      throw Error('Invalid parameter: "description"');
                    return wt.call(this) ? (r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = this.context.jid.clientResource, c2 = { ext: e3.description }, u2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/presence/").concat(s2, "/1"), type: "POST", dataType: "json", data: JSON.stringify(c2), headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: e3.success, error: e3.error }, G.debug("Call publishPresence:", e3), [4, H.call(this, u2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return l2.sent(), [2];
                }
              });
            });
          }
          function ni(e3) {
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!e3.usernames.length)
              throw Error('"usernames" can not be empty');
            if ("number" != typeof e3.expiry)
              throw Error('Invalid parameter: "expiry"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.userId, a2 = r2.accessToken, s2 = { usernames: e3.usernames }, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(i2, "/presence/").concat(e3.expiry), type: "POST", dataType: "json", data: JSON.stringify(s2), headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call subscribePresence:", e3), H.call(this, c2).then(function(e4) {
              return e4.data = { result: null == e4 ? void 0 : e4.result }, e4;
            });
          }
          function ii(e3) {
            return ti(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2;
              return ri(this, function(c2) {
                switch (c2.label) {
                  case 0:
                    if (!Array.isArray(e3.usernames))
                      throw Error('Invalid parameter: "usernames"');
                    if (!e3.usernames.length)
                      throw Error('"usernames" can not be empty');
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.userId, a2 = r2.accessToken, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(i2, "/presence"), type: "DELETE", dataType: "json", data: JSON.stringify(e3.usernames), headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error }, G.debug("Call unsubscribePresence:", e3), [4, H.call(this, s2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return c2.sent(), [2];
                }
              });
            });
          }
          function ai(e3) {
            if ("number" != typeof e3.pageNum || "number" != typeof e3.pageSize)
              throw Error('Invalid parameter: "pageNum or pageSize"');
            if (e3.pageNum < 0 || e3.pageSize < 0)
              throw Error('"pageNum" should >= 0 and "pageSize" should >= 0');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.userId, a2 = r2.accessToken, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(i2, "/presence/sublist?pageNum=").concat(e3.pageNum, "&pageSize=").concat(e3.pageSize), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + a2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getSubscribedPresenceList:", e3), H.call(this, s2).then(function(e4) {
              return e4.data = { result: null == e4 ? void 0 : e4.result }, e4;
            });
          }
          var si = ai;
          function ci(e3) {
            if (!Array.isArray(e3.usernames))
              throw Error('Invalid parameter: "usernames"');
            if (!e3.usernames.length)
              throw Error('"usernames" can not be empty');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { usernames: e3.usernames }, o2 = this.context, n2 = o2.orgName, i2 = o2.appName, a2 = o2.userId, s2 = o2.accessToken, c2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/presence"), type: "POST", dataType: "json", data: JSON.stringify(r2), headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getPresenceStatus:", e3), H.call(this, c2).then(function(e4) {
              return e4.data = { result: null == e4 ? void 0 : e4.result }, e4;
            });
          }
          function ui(e3) {
            if (!(e3.options instanceof Object))
              throw Error('Invalid parameter: "options"');
            var t3 = e3.options.paramType;
            if ("number" != typeof t3 || t3 < 0 || t3 > 2)
              throw Error('Invalid parameter: "options of paramType"');
            if (0 === t3) {
              if ("string" != typeof e3.options.remindType)
                throw Error('Invalid parameter: "options of remindType"');
            } else if (1 === t3) {
              if ("number" != typeof e3.options.duration)
                throw Error('Invalid parameter: "options of duration"');
            } else if (2 === t3) {
              var r2 = e3.options, o2 = r2.startTime, n2 = r2.endTime;
              if (!(o2 instanceof Object && Object.keys(o2).length))
                throw Error('Invalid parameter: "options of startTime"');
              if (!o2.hours || "number" != typeof o2.hours || !o2.minutes || "number" != typeof o2.minutes)
                throw Error('Invalid parameter: "options of startTime of hours or minutes"');
              if (!(n2 instanceof Object && Object.keys(n2).length))
                throw Error('Invalid parameter: "options of endTime"');
              if (!n2.hours || "number" != typeof n2.hours || !n2.minutes || "number" != typeof n2.minutes)
                throw Error('Invalid parameter: "options of endTime of hours or minutes"');
            }
            if (!wt.call(this)) {
              var i2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(i2);
            }
            var a2 = this.context, s2 = a2.accessToken, c2 = a2.orgName, u2 = a2.appName, l2 = a2.userId, d2 = {};
            switch (t3) {
              case 0:
                d2 = { type: e3.options.remindType };
                break;
              case 1:
                d2 = { ignoreDuration: e3.options.duration };
                break;
              case 2:
                var h2 = e3.options;
                o2 = h2.startTime, n2 = h2.endTime, d2 = { ignoreInterval: "".concat(o2.hours, ":").concat(o2.minutes, "-").concat(n2.hours, ":").concat(n2.minutes) };
            }
            var f2 = { url: "".concat(this.apiUrl, "/").concat(c2, "/").concat(u2, "/users/").concat(l2, "/notification/user/").concat(l2), type: "PUT", dataType: "json", data: JSON.stringify(d2), headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call setSilentModeForAll:", e3), H.call(this, f2);
          }
          function li(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/notification/user/").concat(a2), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: null == e3 ? void 0 : e3.success, error: null == e3 ? void 0 : e3.error };
            return G.debug("Call getSilentModeForAll:", e3), H.call(this, s2);
          }
          function pi(e3) {
            if ("string" != typeof e3.conversationId || !e3.conversationId)
              throw Error('Invalid parameter: "conversationId"');
            if ("string" != typeof e3.type || !e3.type)
              throw Error('Invalid parameter: "type"');
            if (!(e3.options instanceof Object))
              throw Error('Invalid parameter: "options"');
            var t3 = e3.options.paramType;
            if ("number" != typeof t3 || t3 < 0 || t3 > 2)
              throw Error('Invalid parameter: "options of paramType"');
            if (0 === t3) {
              if ("string" != typeof e3.options.remindType)
                throw Error('Invalid parameter: "options of remindType"');
            } else if (1 === t3) {
              if ("number" != typeof e3.options.duration)
                throw Error('Invalid parameter: "options of duration"');
            } else if (2 === t3) {
              var r2 = e3.options, o2 = r2.startTime, n2 = r2.endTime;
              if (!(o2 instanceof Object && Object.keys(o2).length))
                throw Error('Invalid parameter: "options of startTime"');
              if (!o2.hours || "number" != typeof o2.hours || !o2.minutes || "number" != typeof o2.minutes)
                throw Error('Invalid parameter: "options of startTime of hours or minutes"');
              if (!(n2 instanceof Object && Object.keys(n2).length))
                throw Error('Invalid parameter: "options of endTime"');
              if (!n2.hours || "number" != typeof n2.hours || !n2.minutes || "number" != typeof n2.minutes)
                throw Error('Invalid parameter: "options of endTime of hours or minutes"');
            }
            if (!wt.call(this)) {
              var i2 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(i2);
            }
            var a2 = this.context, s2 = a2.accessToken, c2 = a2.orgName, u2 = a2.appName, l2 = a2.userId, d2 = "chatgroup", h2 = {};
            switch (t3) {
              case 0:
                h2 = { type: e3.options.remindType };
                break;
              case 1:
                h2 = { ignoreDuration: e3.options.duration };
                break;
              case 2:
                var f2 = e3.options;
                o2 = f2.startTime, n2 = f2.endTime, h2 = { ignoreInterval: "".concat(o2.hours, ":").concat(o2.minutes, "-").concat(n2.hours, ":").concat(n2.minutes) };
            }
            "singleChat" === e3.type && (d2 = "user");
            var g2 = { url: "".concat(this.apiUrl, "/").concat(c2, "/").concat(u2, "/users/").concat(l2, "/notification/").concat(d2, "/").concat(e3.conversationId), type: "PUT", dataType: "json", data: JSON.stringify(h2), headers: { Authorization: "Bearer " + s2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call setSilentModeForConversation:", e3), H.call(this, g2);
          }
          function di(e3) {
            if ("string" != typeof e3.conversationId || !e3.conversationId)
              throw Error('Invalid parameter: "conversationId"');
            if ("string" != typeof e3.type || !e3.type)
              throw Error('Invalid parameter: "type"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = "chatgroup";
            "singleChat" === e3.type && (s2 = "user");
            var c2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/notification/").concat(s2, "/").concat(e3.conversationId), type: "PUT", dataType: "json", data: JSON.stringify({ type: "DEFAULT" }), headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call clearRemindTypeForConversation:", e3), H.call(this, c2);
          }
          function hi(e3) {
            if ("string" != typeof e3.conversationId || !e3.conversationId)
              throw Error('Invalid parameter: "conversationId"');
            if ("string" != typeof e3.type || !e3.type)
              throw Error('Invalid parameter: "type"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = "chatgroup";
            "singleChat" === e3.type && (s2 = "user");
            var c2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/notification/").concat(s2, "/").concat(e3.conversationId), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getSilentModeForConversation:", e3), H.call(this, c2);
          }
          function fi(e3) {
            if (!Array.isArray(e3.conversationList))
              throw Error('Invalid parameter: "conversationList"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = [], c2 = [];
            e3.conversationList.forEach(function(e4) {
              "singleChat" === e4.type ? s2.push(e4.id) : c2.push(e4.id);
            });
            var u2 = s2.length ? s2.join(",") : "", l2 = c2.length ? c2.join(",") : "", d2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/notification?user=").concat(u2, "&group=").concat(l2), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call getSilentModeForConversations:", e3), H.call(this, d2);
          }
          function mi(e3) {
            if ("string" != typeof e3.language || !e3.language)
              throw Error('Invalid parameter: "language"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = { translationLanguage: e3.language }, o2 = this.context, n2 = o2.accessToken, i2 = o2.orgName, a2 = o2.appName, s2 = o2.userId, c2 = { url: "".concat(this.apiUrl, "/").concat(i2, "/").concat(a2, "/users/").concat(s2, "/notification/language"), type: "PUT", dataType: "json", data: JSON.stringify(r2), headers: { Authorization: "Bearer " + n2, "Content-Type": "application/json" }, success: e3.success, error: e3.error };
            return G.debug("Call setPushPerformLanguage:", e3), H.call(this, c2);
          }
          function gi(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.accessToken, n2 = r2.orgName, i2 = r2.appName, a2 = r2.userId, s2 = { url: "".concat(this.apiUrl, "/").concat(n2, "/").concat(i2, "/users/").concat(a2, "/notification/language"), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + o2, "Content-Type": "application/json" }, success: null == e3 ? void 0 : e3.success, error: null == e3 ? void 0 : e3.error };
            return G.debug("Call getPushPerformLanguage:", e3), H.call(this, s2);
          }
          var Ei = function(e3, t3, r2, o2) {
            return new (r2 || (r2 = Promise))(function(n2, i2) {
              function a2(e4) {
                try {
                  c2(o2.next(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function s2(e4) {
                try {
                  c2(o2.throw(e4));
                } catch (e5) {
                  i2(e5);
                }
              }
              function c2(e4) {
                var t4;
                e4.done ? n2(e4.value) : (t4 = e4.value, t4 instanceof r2 ? t4 : new r2(function(e5) {
                  e5(t4);
                })).then(a2, s2);
              }
              c2((o2 = o2.apply(e3, t3 || [])).next());
            });
          }, yi = function(e3, t3) {
            var r2, o2, n2, i2, a2 = { label: 0, sent: function() {
              if (1 & n2[0])
                throw n2[1];
              return n2[1];
            }, trys: [], ops: [] };
            return i2 = { next: s2(0), throw: s2(1), return: s2(2) }, "function" == typeof Symbol && (i2[Symbol.iterator] = function() {
              return this;
            }), i2;
            function s2(i3) {
              return function(s3) {
                return function(i4) {
                  if (r2)
                    throw new TypeError("Generator is already executing.");
                  for (; a2; )
                    try {
                      if (r2 = 1, o2 && (n2 = 2 & i4[0] ? o2.return : i4[0] ? o2.throw || ((n2 = o2.return) && n2.call(o2), 0) : o2.next) && !(n2 = n2.call(o2, i4[1])).done)
                        return n2;
                      switch (o2 = 0, n2 && (i4 = [2 & i4[0], n2.value]), i4[0]) {
                        case 0:
                        case 1:
                          n2 = i4;
                          break;
                        case 4:
                          return a2.label++, { value: i4[1], done: false };
                        case 5:
                          a2.label++, o2 = i4[1], i4 = [0];
                          continue;
                        case 7:
                          i4 = a2.ops.pop(), a2.trys.pop();
                          continue;
                        default:
                          if (!((n2 = (n2 = a2.trys).length > 0 && n2[n2.length - 1]) || 6 !== i4[0] && 2 !== i4[0])) {
                            a2 = 0;
                            continue;
                          }
                          if (3 === i4[0] && (!n2 || i4[1] > n2[0] && i4[1] < n2[3])) {
                            a2.label = i4[1];
                            break;
                          }
                          if (6 === i4[0] && a2.label < n2[1]) {
                            a2.label = n2[1], n2 = i4;
                            break;
                          }
                          if (n2 && a2.label < n2[2]) {
                            a2.label = n2[2], a2.ops.push(i4);
                            break;
                          }
                          n2[2] && a2.ops.pop(), a2.trys.pop();
                          continue;
                      }
                      i4 = t3.call(e3, a2);
                    } catch (e4) {
                      i4 = [6, e4], o2 = 0;
                    } finally {
                      r2 = n2 = 0;
                    }
                  if (5 & i4[0])
                    throw i4[1];
                  return { value: i4[0] ? i4[1] : void 0, done: true };
                }([i3, s3]);
              };
            }
          };
          function Ti(e3) {
            if ("string" != typeof e3.name || "" === e3.name)
              throw Error("Invalid parameter name: ".concat(e3.name));
            if ("string" != typeof e3.messageId || "" === e3.messageId)
              throw Error("Invalid parameter messageId: ".concat(e3.messageId));
            if ("string" != typeof e3.parentId || "" === e3.parentId)
              throw Error("Invalid parameter parentId: ".concat(e3.parentId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { name: e3.name, msg_id: e3.messageId, group_id: e3.parentId, owner: this.user }, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread?resource=").concat(a2.clientResource), type: "POST", dataType: "json", data: JSON.stringify(s2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, c2).then(function(e4) {
              var t4 = e4.data.thread_id;
              return e4.data = { chatThreadId: t4 }, e4;
            });
          }
          function _i(e3) {
            if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
              throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "/user/").concat(this.user, "/join?resource=").concat(a2.clientResource), type: "POST", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2).then(function(e4) {
              var t4 = e4.data.detail;
              return t4.messageId = t4.msgId, t4.parentId = t4.groupId, delete t4.msgId, delete t4.groupId, e4;
            });
          }
          function vi(e3) {
            return Ei(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2;
              return yi(this, function(c2) {
                switch (c2.label) {
                  case 0:
                    if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
                      throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "/user/").concat(this.user, "/quit?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } }, [4, H.call(this, s2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return c2.sent(), [2];
                }
              });
            });
          }
          function Oi(e3) {
            return Ei(this, void 0, void 0, function() {
              var t3, r2, o2, n2, i2, a2, s2;
              return yi(this, function(c2) {
                switch (c2.label) {
                  case 0:
                    if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
                      throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
                    return wt.call(this) ? (r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } }, [4, H.call(this, s2)]) : (t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" }), [2, Promise.reject(t3)]);
                  case 1:
                    return c2.sent(), [2];
                }
              });
            });
          }
          function Ri(e3) {
            if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
              throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
            if ("string" != typeof e3.name || "" === e3.name)
              throw Error("Invalid parameter name: ".concat(e3.name));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { name: e3.name }, c2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "?resource=").concat(a2.clientResource), type: "PUT", dataType: "json", data: JSON.stringify(s2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, c2);
          }
          function Ii(e3) {
            if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
              throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { limit: e3.pageSize || 20, cursor: e3.cursor || "" }, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "/users"), type: "GET", dataType: "json", data: a2, headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2);
          }
          function Si(e3) {
            if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
              throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
            if ("string" != typeof e3.username || "" === e3.username)
              throw Error("Invalid parameter username: ".concat(e3.username));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = r2.jid, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId, "/users/").concat(e3.username, "?resource=").concat(a2.clientResource), type: "DELETE", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2);
          }
          function Ci(e3) {
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { limit: e3.pageSize || 20, cursor: e3.cursor || "" }, s2 = { url: e3.parentId ? "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/threads/chatgroups/").concat(e3.parentId, "/user/").concat(this.user) : "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/threads/user/").concat(this.user), type: "GET", dataType: "json", data: a2, headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2).then(function(e4) {
              var t4 = e4.entities;
              return null == t4 || t4.forEach(function(e5) {
                e5.parentId = e5.groupId, e5.messageId = e5.msgId, delete e5.groupId, delete e5.msgId;
              }), e4;
            });
          }
          function Ni(e3) {
            if ("string" != typeof e3.parentId || "" === e3.parentId)
              throw Error("Invalid parameter parentId: ".concat(e3.parentId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { cursor: e3.cursor || "", limit: e3.pageSize || 20 }, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/threads/chatgroups/").concat(e3.parentId), type: "GET", dataType: "json", data: a2, headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2).then(function(e4) {
              var t4 = e4.entities;
              return null == t4 || t4.forEach(function(e5) {
                e5.parentId = e5.groupId, e5.messageId = e5.msgId, delete e5.groupId, delete e5.msgId;
              }), e4;
            });
          }
          function Ai(e3) {
            if (!Array.isArray(e3.chatThreadIds))
              throw Error("Invalid parameter chatThreadIds: ".concat(e3.chatThreadIds));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { threadIds: e3.chatThreadIds }, s2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/message"), type: "POST", dataType: "json", data: JSON.stringify(a2), headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, s2).then(function(e4) {
              return function(e5) {
                var t4 = e5.entities;
                return null == t4 || t4.forEach(function(e6) {
                  e6.chatThreadId = e6.thread_id, e6.last_message && "{}" !== JSON.stringify(e6.last_message) ? e6.lastMessage = re(e6.last_message) : e6.lastMessage = e6.last_message, delete e6.thread_id, delete e6.last_message;
                }), e5;
              }(e4);
            });
          }
          function Mi(e3) {
            if ("string" != typeof e3.chatThreadId || "" === e3.chatThreadId)
              throw Error("Invalid parameter chatThreadId: ".concat(e3.chatThreadId));
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = { url: "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/thread/").concat(e3.chatThreadId), type: "GET", dataType: "json", headers: { Authorization: "Bearer " + i2, "Content-Type": "application/json" } };
            return H.call(this, a2).then(function(e4) {
              return e4.data.affiliationsCount = e4.data.affiliations_count, e4.data.messageId = e4.data.msgId, e4.data.parentId = e4.data.groupId, delete e4.data.affiliations_count, delete e4.data.msgId, delete e4.data.groupId, e4;
            });
          }
          function bi() {
            if (!wt.call(this)) {
              var e3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(e3);
            }
            var t3 = this.context, r2 = t3.orgName, o2 = t3.appName, n2 = t3.accessToken, i2 = { url: "".concat(this.apiUrl, "/").concat(r2, "/").concat(o2, "/users/").concat(this.user, "/translate/support/language"), dataType: "json", type: "GET", headers: { Authorization: "Bearer " + n2 } };
            return G.debug("Call getSupportedLanguages"), H.call(this, i2);
          }
          function Ui(e3) {
            if ("string" != typeof e3.text || "" === e3.text)
              throw Error('Invalid parameter: "text"');
            if (!Array.isArray(e3.languages))
              throw Error('Invalid parameter: "language"');
            if (!wt.call(this)) {
              var t3 = m.create({ type: p.REST_PARAMS_STATUS, message: "appkey or token error" });
              return Promise.reject(t3);
            }
            var r2 = this.context, o2 = r2.orgName, n2 = r2.appName, i2 = r2.accessToken, a2 = "".concat(this.apiUrl, "/").concat(o2, "/").concat(n2, "/users/").concat(this.user, "/translate"), s2 = { text: e3.text, to: e3.languages }, c2 = { url: a2, dataType: "json", type: "POST", data: JSON.stringify(s2), headers: { Authorization: "Bearer " + i2 } };
            return G.debug("Call translateMessage"), H.call(this, c2);
          }
          var wi = function() {
            return wi = Object.assign || function(e3) {
              for (var t3, r2 = 1, o2 = arguments.length; r2 < o2; r2++)
                for (var n2 in t3 = arguments[r2])
                  Object.prototype.hasOwnProperty.call(t3, n2) && (e3[n2] = t3[n2]);
              return e3;
            }, wi.apply(this, arguments);
          }, ki = $2.getEnvInfo(), Pi = "web" === ki.platform, Li = function() {
          }, Di = function() {
            function r2(o2) {
              var u2;
              if (this.name = "connection", this.isDebug = o2.isDebug || false, this.isReport = false, this.isHttpDNS = void 0 === o2.isHttpDNS ? Pi : o2.isHttpDNS, this.heartBeatWait = o2.heartBeatWait || 3e4, this.autoReconnectNumMax = o2.autoReconnectNumMax || 5, this.refreshDNSIntervals = this.autoReconnectNumMax < 5 ? this.autoReconnectNumMax : 5, this.delivery = o2.delivery || false, this.dnsArr = ["https://rs.easemob.com", "https://rs.chat.agora.io", "http://59.110.89.59", "http://39.97.193.190", "http://39.97.193.187"], this.dnsIndex = 0, this.dnsTotal = this.dnsArr.length, this.restHosts = [], this.restTotal = 0, this.restIndex = 0, this.hostIndex = 0, this.socketHost = [], this.hostTotal = 0, this.times = 1, this.autoReconnectNumTotal = 0, this.domain = "easemob.com", this.appKey = o2.appKey, this.appName = "", this.orgName = "", this.token = "", this.grantType = "", this.apiUrl = o2.apiUrl || "", this.url = o2.url || "", this.https = o2.https || "undefined" != typeof window && "https:" === (null === (u2 = window.location) || void 0 === u2 ? void 0 : u2.protocol), this.version = "4.1.4", this.deviceId = o2.deviceId || "webim", this.osType = 16, this.useOwnUploadFun = o2.useOwnUploadFun || false, this.compressType = [0], this.encryptType = [0], this.clientResource = "", this.expiresIn = 0, this.expirationTime = 0, this.logOut = true, this.context = { jid: { appKey: "", clientResource: "", domain: "easemob.com", name: "" }, userId: "", appKey: "", status: 0, restTokenData: "", appName: "", orgName: "", root: {}, accessToken: "" }, this._msgHash = {}, this._msgPromiseHash = {}, this._queues = [], this._load_msg_cache = [], this.unSendMsgArr = [], this.mr_cache = {}, this.closeInfo = null, this.reconnecting = false, "string" != typeof this.appKey || 2 !== this.appKey.split("#").length)
                throw Error("Illegal appKey: ".concat(this.appKey));
              var l2 = this.appKey.split("#");
              this.orgName = l2[0], this.appName = l2[1], this.listen = ht.bind(this), this.mSync = this.usePlugin(lt), this.eventHandler = this.usePlugin(pt), Object.assign(r2.prototype, e2), Object.assign(r2.prototype, t2), Object.assign(r2.prototype, n), Object.assign(r2.prototype, i), Object.assign(r2.prototype, a), Object.assign(r2.prototype, s), Object.assign(r2.prototype, c), this.dataReport = new Mt({ appkey: this.appKey, org: this.orgName, sdkVersion: this.version, deviceId: this.deviceId, isReport: this.isReport });
              var p2 = 0, d2 = this;
              Object.defineProperty($2, "ajaxUnconventionalErrorTimes", { set: function(e3) {
                0 !== e3 && (G.debug("rest api request fail times: ".concat(e3)), (p2 = e3) % 5 == 0 && this.isHttpDNS && (G.debug("refresh dns config when rest request fail."), qi.call(d2, "refresh", {}, {})));
              }, get: function() {
                return p2;
              } });
            }
            return r2.prototype.usePlugin = function(e3, t3) {
              if (!t3)
                return new e3(this);
              this[t3] = new e3(this);
            }, r2.prototype.listen = function(e3) {
            }, r2.prototype.addEventHandler = function(e3, t3) {
            }, r2.prototype.removeEventHandler = function(e3) {
            }, r2.prototype.registerUser = function(e3) {
              var t3 = this;
              return new Promise(function(r3, o2) {
                var n2 = t3.dataReport.geOperateFun({ uid: e3.username, operationName: E.REGISTER });
                if (t3.isHttpDNS) {
                  t3.dnsIndex = 0;
                  var i2 = wi(wi({}, e3), { user: e3.username, pwd: e3.password, promise: { resolve: r3, reject: o2 } });
                  qi.call(t3, "signup", i2, { rpt: n2 });
                } else
                  i2 = wi(wi({}, e3), { promise: { resolve: r3, reject: o2 } }), Gi.call(t3, i2, { rpt: n2 });
              });
            }, r2.prototype.open = function(e3) {
              var t3 = this;
              return G.debug("open"), new Promise(function(r3, o2) {
                if (Fi.call(t3, e3)) {
                  e3.accessToken && (t3.token = e3.accessToken);
                  var n2 = wi(wi({}, e3), { promise: { resolve: r3, reject: o2 } }), i2 = t3.dataReport.geOperateFun({ uid: e3.user, operationName: E.LOGIN });
                  t3.isHttpDNS ? qi.call(t3, "login", n2, { rpt: i2 }) : xi.call(t3, n2, { rpt: i2 });
                }
              });
            }, r2.prototype.isOpened = function() {
              return this.sock && 1 === this.sock.readyState || false;
            }, r2.prototype.close = function() {
              this.logOut = true, this.reconnecting = false, this.context.status = p.STATUS_CLOSING, this.sock && this.sock.close(), this.stopHeartBeat(), this.rejectMessage(), this.context.status = p.STATUS_CLOSED, this._load_msg_cache = [], this.unSendMsgArr = [], this._queues = [], this._msgHash = {}, this.mr_cache = {}, this.token = "", this.context.accessToken = "";
            }, r2.prototype.stopHeartBeat = function() {
              clearInterval(this.heartBeatID);
            }, r2.prototype._checkOpenParams = function(e3) {
              return Fi.call(this, e3);
            }, r2.prototype.clear = function() {
              this.restTotal = 0, this.restIndex = 0, this.hostIndex = 0, this.hostTotal = 0;
            }, r2.prototype.heartBeat = function() {
            }, r2.prototype.renewToken = function(e3) {
              var t3 = this;
              return this.isOpened() ? this.getChatToken(e3).then(function(e4) {
                var r3 = Date.now();
                return t3.expirationTime = e4.expire_timestamp, t3.expiresIn = e4.expire_timestamp - r3, t3.token = e4.access_token, t3.context.accessToken = e4.access_token, t3.clearTokenTimeout(), t3.tokenExpireTimeCountDown(t3.expiresIn), { status: true, token: e4.access_token, expire: e4.expire_timestamp };
              }) : Promise.reject({ status: false });
            }, r2.prototype.clearTokenTimeout = function() {
              G.debug("clearTokenTimeout"), this.tokenWillExpireTimer && clearTimeout(this.tokenWillExpireTimer), this.tokenExpiredTimer && clearTimeout(this.tokenExpiredTimer);
            }, r2.prototype.tokenExpireTimeCountDown = function(e3) {
              var t3 = this;
              e3 > Math.pow(2, 31) - 1 && (e3 = Math.pow(2, 31) - 1), this.tokenWillExpireTimer = setTimeout(function() {
                var r3;
                t3.onTokenWillExpire && t3.onTokenWillExpire(), null === (r3 = t3.eventHandler) || void 0 === r3 || r3.dispatch("onTokenWillExpire"), G.info("onTokenWillExpire", e3);
              }, e3 / 2), this.tokenExpiredTimer = setTimeout(function() {
                var r3;
                G.info("onTokenExpired", e3), t3.onTokenExpired && t3.onTokenExpired(), null === (r3 = t3.eventHandler) || void 0 === r3 || r3.dispatch("onTokenExpired"), t3.close();
              }, e3);
            }, r2.prototype.compareTokenExpireTime = function(e3, t3) {
              var r3, o2 = Number(t3) - Number(e3);
              G.debug("compareTokenExpireTime", o2), o2 <= this.expiresIn / 2 && o2 > 0 ? (this.onTokenWillExpire && this.onTokenWillExpire(), null === (r3 = this.eventHandler) || void 0 === r3 || r3.dispatch("onTokenWillExpire"), G.info("onTokenWillExpire", o2)) : o2 <= 0 && (this.closeByTokenExpired(), G.info("closeByTokenExpired", o2));
            }, r2.prototype.closeByTokenExpired = function() {
              var e3;
              G.info("closed By TokenExpired"), this.onTokenExpired && this.onTokenExpired(), null === (e3 = this.eventHandler) || void 0 === e3 || e3.dispatch("onTokenExpired"), this.close();
            }, r2.prototype.rejectMessage = function() {
              var e3 = this, t3 = Object.keys(this._msgHash);
              if (t3.length > 0) {
                var r3 = m.create({ type: p.MESSAGE_WEBSOCKET_DISCONNECTED, message: "websocket disconnected" });
                t3.forEach(function(t4) {
                  e3._msgHash[t4].reject instanceof Function && e3._msgHash[t4].reject(r3), e3._msgHash[t4].fail instanceof Function && e3._msgHash[t4].fail(r3), delete e3._msgHash[t4];
                });
              }
            }, r2.prototype.resetConnState = function() {
              this.mSync.stopHeartBeat(), this.times = 1, this.autoReconnectNumTotal = 0, this.hostIndex = 0;
            }, r2.prototype.reconnect = function() {
              var e3, t3 = this;
              0 !== this.sock.readyState && 1 !== this.sock.readyState && (G.info("reconnect: time", this.times), G.info("reconnect sock.readyState: ", this.sock.readyState), false === this.reconnecting && (this.reconnecting = true), null === (e3 = this.eventHandler) || void 0 === e3 || e3.dispatch("onReconnecting"), this.rejectMessage(), this.isHttpDNS && (this.hostIndex < this.socketHost.length - 1 ? this.hostIndex++ : this.hostIndex = this.socketHost.length - 1), setTimeout(function() {
                1 !== t3.sock.readyState && (G.info("login sock.readyState: ", t3.sock.readyState), t3.sock.close(), ji.call(t3, { access_token: t3.context.accessToken }), t3.times++);
              }, 500 * this.times), this.autoReconnectNumTotal++);
            }, r2.prototype.send = function(e3) {
              return Promise.resolve(null);
            }, r2.max_cache_length = 100, r2._getSock = function() {
            }, r2;
          }();
          function Gi(e3, t3) {
            var r2 = this, o2 = t3.rpt, n2 = t3.isRetry, i2 = e3.promise, a2 = this.apiUrl + "/" + this.orgName + "/" + this.appName + "/users", s2 = { requestName: y.RESISTER, requestUrl: a2 }, c2 = e3.error || Li;
            if (!this.orgName && !this.appName) {
              var u2 = m.create({ type: p.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR, message: "signup error" });
              c2(u2);
            }
            var l2 = { headers: { "Content-type": "application/json" }, url: a2, dataType: "json", data: JSON.stringify({ username: e3.username, password: e3.password, nickname: e3.nickname || "" }), success: function(t4) {
              e3.success && e3.success(t4);
              var r3 = wi(wi({}, t4), { type: p.REQUEST_SUCCESS });
              i2.resolve && i2.resolve(r3);
              var a3 = t4.extraInfo, c3 = a3.httpCode, u3 = a3.elapse;
              o2({ isEndApi: true, isRetry: n2, data: wi(wi({}, { requestElapse: u3, isSuccess: 1, code: c3 }), s2) });
            }, error: function(t4) {
              var a3 = t4.extraInfo, u3 = a3.elapse, l3 = a3.httpCode, p2 = a3.errDesc;
              return o2({ isRetry: n2, data: wi(wi({}, { requestElapse: u3, isSuccess: 0, code: l3, codeDesc: p2 }), s2) }), r2.isHttpDNS && r2.restIndex + 1 < r2.restTotal ? (r2.restIndex++, Ki.call(r2), Gi.call(r2, e3, { rpt: o2, isRetry: n2 }), Promise.reject(t4)) : (o2({ data: { isLastApi: 1, isSuccess: 0 } }), r2.clear(), i2.reject && i2.reject(t4), c2(t4));
            } };
            return $2.ajax(l2).catch(function(e4) {
              i2.reject && i2.reject(e4);
            });
          }
          function xi(e3, t3) {
            var r2 = this;
            if (Fi.call(this, e3) && !this.isOpened()) {
              var o2 = t3.rpt, n2 = t3.isRetry;
              Wi.call(this, e3), this.user = e3.user;
              var i2 = e3.promise, a2 = this.context.appName, s2 = this.context.orgName, c2 = this.apiUrl + "/" + s2 + "/" + a2 + "/token";
              if (e3.agoraToken)
                this.grantType = "agoraToken", this.getChatToken(e3.agoraToken).then(function(t4) {
                  G.info("getChatToken result:", t4), r2.expirationTime = t4.expire_timestamp, r2.token = t4.access_token, r2.context.accessToken = t4.access_token, r2.context.restTokenData = t4.access_token;
                  var n3 = t4.extraInfo, a3 = n3.httpCode, s3 = n3.elapse;
                  i2.resolve({ accessToken: t4.access_token, expireTimestamp: t4.expire_timestamp });
                  var u3 = { requestName: y.LOGIN_BY_AGORA_TOKEN, requestUrl: c2, requestElapse: s3, isSuccess: 1, code: a3 };
                  o2({ data: u3 }), ji.call(r2, wi(wi({}, e3), { access_token: t4.access_token }), o2);
                }).catch(function(e4) {
                  var t4, n3 = m.create({ type: p.WEBIM_CONNCTION_GETROSTER_ERROR, message: "get chat token fail", data: e4 });
                  i2.reject(n3), r2.onError && r2.onError(n3), null === (t4 = r2.eventHandler) || void 0 === t4 || t4.dispatch("onError", n3);
                  var a3 = e4.extraInfo, s3 = a3.elapse, u3 = a3.httpCode, l3 = a3.errDesc, d3 = { requestName: y.LOGIN_BY_AGORA_TOKEN, requestUrl: c2, requestElapse: s3, isSuccess: 0, code: u3, codeDesc: l3 };
                  o2({ data: d3 }), o2({ data: { isLastApi: 1, isSuccess: 0 } });
                });
              else if (e3.accessToken)
                this.grantType = "accessToken", this.token = e3.accessToken, this.context.accessToken = e3.accessToken, this.context.restTokenData = e3.accessToken, i2.resolve({ accessToken: e3.accessToken }), ji.call(this, e3, o2);
              else {
                this.grantType = "password";
                var u2 = { grant_type: "password", username: e3.user, password: e3.pwd, timestamp: +new Date() }, l2 = JSON.stringify(u2), d2 = { headers: { "Content-type": "application/json" }, url: c2, dataType: "json", data: l2, success: function(t4) {
                  "function" == typeof e3.success && e3.success(t4), r2.token = t4.access_token, r2.context.restTokenData = t4.access_token, r2.context.accessToken = t4.access_token, r2.expiresIn = t4.expires_in, r2.clearTokenTimeout(), r2.tokenExpireTimeCountDown(r2.expiresIn), i2.resolve({ accessToken: t4.access_token, duration: t4.expires_in });
                  var a3 = t4.extraInfo, s3 = a3.httpCode, u3 = a3.elapse, l3 = { requestName: y.LOGIN_BY_PWD, requestElapse: u3, requestUrl: c2, isSuccess: 1, code: s3 };
                  o2({ isRetry: n2, data: l3 }), ji.call(r2, t4, o2);
                }, error: function(t4) {
                  var a3, s3 = t4.extraInfo, u3 = s3.elapse, l3 = s3.httpCode, d3 = s3.errDesc, h2 = { requestName: y.LOGIN_BY_PWD, requestElapse: u3, requestUrl: c2, isSuccess: 0, code: l3, codeDesc: d3 };
                  if (o2({ isRetry: n2, data: h2 }), r2.isHttpDNS && r2.restIndex + 1 < r2.restTotal)
                    return r2.restIndex++, Ki.call(r2), void xi.call(r2, e3, { rpt: o2, isRetry: true });
                  o2({ data: { isLastApi: 1, isSuccess: 0 } }), r2.clear(), t4.error && t4.error_description ? (a3 = m.create({ type: p.WEBIM_CONNCTION_OPEN_USERGRID_ERROR, message: t4.error_description, data: t4 }), r2.onError && r2.onError(a3)) : (a3 = m.create({ type: p.WEBIM_CONNCTION_OPEN_ERROR, message: t4.error_description, data: t4 }), r2.onError && r2.onError(a3)), "function" == typeof e3.error && e3.error(a3), i2.reject(a3);
                }, version: "4.0.8" };
                $2.ajax(d2).catch(function(e4) {
                  console.warn(e4);
                });
              }
              $2.listenNetwork(Bi.bind(this), Hi.bind(this));
            }
          }
          function Bi() {
            var e3;
            G.debug("online"), this.onOnline && this.onOnline(), null === (e3 = this.eventHandler) || void 0 === e3 || e3.dispatch("onOnline"), this.sock && 1 !== this.sock.readyState && (G.debug("sock.readyState:", this.sock.readyState), this.logOut || this.reconnecting || this.reconnect());
          }
          function Hi() {
            var e3;
            G.debug("offline"), this.onOffline && this.onOffline(), null === (e3 = this.eventHandler) || void 0 === e3 || e3.dispatch("onOffline");
          }
          function ji(e3, t3) {
            var r2 = this, o2 = this._getSock();
            this.sock = o2;
            var n2 = function() {
              var e4;
              G.debug("websockt onOpen"), t3 && t3({ data: { isLastApi: 1, isSuccess: 1, accessChannel: null === (e4 = r2.socketHost[r2.hostIndex]) || void 0 === e4 ? void 0 : e4.channel } });
              var n3 = $2.flow([r2.mSync.generateProvision, r2.mSync.base64transform])();
              try {
                o2.send(n3);
              } catch (e5) {
                var i3 = m.create({ type: p.SDK_RUNTIME_ERROR, message: "send message error", data: e5 });
                r2.onError && r2.onError(i3);
              }
            }, i2 = function(e4) {
              setTimeout(function() {
                var t4, o3, n3, i3, a3;
                G.debug("websocket onClose"), "zfb" !== ki.platform && "dd" !== ki.platform || (r2.sock.readyState = 3);
                var s2 = 401 === (null == e4 ? void 0 : e4.code) || 401 === (null === (t4 = r2.closeInfo) || void 0 === t4 ? void 0 : t4.code);
                if (r2.logOut)
                  r2.clear(), r2.resetConnState(), s2 && (G.debug("websocket provision error"), r2.closeInfo = null), r2.onClosed && r2.onClosed(), null === (o3 = r2.eventHandler) || void 0 === o3 || o3.dispatch("onDisconnected");
                else if (s2) {
                  G.debug("websocket provision error");
                  var c2 = { type: p.WEBIM_CONNECTION_ERROR, message: "provision error", data: e4 };
                  r2.closeInfo = null, r2.onError && r2.onError(c2), null === (n3 = r2.eventHandler) || void 0 === n3 || n3.dispatch("onError", c2), r2.onClosed && r2.onClosed(), null === (i3 = r2.eventHandler) || void 0 === i3 || i3.dispatch("onDisconnected"), r2.resetConnState();
                } else if (r2.autoReconnectNumTotal < r2.autoReconnectNumMax) {
                  r2.reconnect();
                  var u2 = { type: p.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected" };
                  r2.onError && r2.onError(u2), r2.autoReconnectNumTotal % r2.refreshDNSIntervals == 0 && "web" === ki.platform && r2.isHttpDNS && (G.debug("refresh dns config when websocket close"), qi.call(r2, "refresh", {}, {}));
                } else
                  u2 = { type: p.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected" }, r2.onError && r2.onError(u2), r2.onClosed && r2.onClosed(), null === (a3 = r2.eventHandler) || void 0 === a3 || a3.dispatch("onDisconnected"), r2.resetConnState(), r2.reconnecting = false, G.debug("reconnect fail");
              }, 0);
            }, a2 = function(e4) {
              var t4 = r2.mSync, o3 = t4.decodeMSync, n3 = t4.distributeMSync;
              $2.flow([o3, n3])(e4);
            };
            "web" === ki.platform ? (o2.onopen = n2, o2.onclose = i2, o2.onmessage = a2) : (o2.onOpen(n2), o2.onMessage(a2), o2.onClose(i2), "undefined" != typeof window && window.WebSocket || o2.onError(function(e4) {
              var o3, n3;
              if (G.debug("mini program sock on error", e4), r2.onError && r2.onError({ type: p.WEBIM_CONNECTION_ERROR, message: "on socket error", data: e4 }), !r2.logOut)
                if (r2.autoReconnectNumTotal < r2.autoReconnectNumMax)
                  G.debug("sock.onError reconnect", r2.autoReconnectNumTotal, r2.autoReconnectNumMax), r2.reconnect(), r2.autoReconnectNumTotal % r2.refreshDNSIntervals == 0 && "web" === ki.platform && r2.isHttpDNS && (G.debug("refresh dns config when websocket error"), qi.call(r2, "refresh", {}, {}));
                else {
                  var i3 = { type: p.WEBIM_CONNCTION_DISCONNECTED, message: "websocket has been disconnected" };
                  r2.onError && r2.onError(i3), r2.onClosed && r2.onClosed(), null === (o3 = r2.eventHandler) || void 0 === o3 || o3.dispatch("onDisconnected"), r2.resetConnState(), r2.reconnecting = false, G.debug("reconnect fail");
                }
              t3 && t3({ data: { isLastApi: 1, isSuccess: 0, accessChannel: null === (n3 = r2.socketHost[r2.hostIndex]) || void 0 === n3 ? void 0 : n3.channel } });
            }));
          }
          function Fi(e3) {
            if ("" === e3.user) {
              var t3 = m.create({ type: p.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR, message: "the user cannot be empty" });
              return this.onError && this.onError(t3), false;
            }
            var r2 = this.appKey.split("#");
            return !(2 !== r2.length || !r2[0] || !r2[1]) || (t3 = m.create({ type: p.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR, message: "the appKey is illegal" }), this.onError && this.onError(t3), false);
          }
          function Wi(e3) {
            this.context.jid = { appKey: this.appKey, name: e3.user, domain: this.domain, clientResource: this.clientResource };
            var t3 = this.appKey.split("#"), r2 = t3[0], o2 = t3[1];
            this.context.root = this.root, this.context.userId = e3.user, this.context.appKey = this.appKey, this.context.appName = o2, this.context.orgName = r2;
          }
          function qi(e3, t3, r2) {
            var o2 = this, n2 = r2.rpt, i2 = r2.isRetry, a2 = this.dnsArr[this.dnsIndex] + "/easemob/server.json", s2 = { url: a2, dataType: "json", type: "GET", data: { app_key: encodeURIComponent(this.appKey) }, success: function(r3) {
              var s3 = r3.extraInfo, c2 = s3.elapse, u2 = s3.httpCode, l2 = { requestUrl: a2, requestName: y.GET_DNS, requestElapse: c2, isSuccess: 1, code: u2 };
              "true" === (null == r3 ? void 0 : r3.enableDataReport) ? (o2.dataReport.setIsCollectDt(true), o2.dataReport.setIsReportDt(true)) : (o2.dataReport.setIsReportDt(false), o2.dataReport.setIsCollectDt(false)), n2 && n2({ isRetry: i2, data: l2 });
              var p2 = r3.rest.hosts, d2 = o2.https ? "https" : "http";
              if (G.info("httpType: " + d2), !p2)
                return Promise.reject(false);
              for (var h2 = p2.filter(function(e4) {
                if (e4.protocol === d2)
                  return e4;
              }), f2 = 0; f2 < h2.length; f2++)
                if (h2[f2].protocol === d2) {
                  var m2 = h2[f2];
                  h2.splice(f2, 1), h2.unshift(m2);
                }
              o2.restHosts = h2, o2.restTotal = h2.length;
              var g2 = r3["msync-ws"].hosts;
              if (!g2)
                return Promise.reject(false);
              var E2 = g2.filter(function(e4) {
                return e4.protocol === d2 && e4;
              });
              o2.socketHost = E2, o2.hostTotal = E2.length, Ki.call(o2), "refresh" !== e3 && ("login" === e3 ? xi.call(o2, t3, { rpt: n2 }) : Gi.call(o2, t3, { rpt: n2 }));
            }, error: function(r3) {
              var s3 = r3.extraInfo, c2 = s3.elapse, u2 = s3.httpCode, l2 = s3.errDesc, p2 = { requestUrl: a2, requestName: y.GET_DNS, isSuccess: 0, code: u2, codeDesc: l2, requestElapse: c2 };
              n2 && n2({ isRetry: i2, data: p2 }), G.debug("getHttpDNS fail: " + o2.dnsIndex), o2.dnsIndex++, o2.dnsIndex < o2.dnsTotal && qi.call(o2, e3, t3, { rpt: n2, isRetry: true });
            } };
            return $2.ajax(s2).catch(function(e4) {
              console.warn(e4);
            });
          }
          function Ki() {
            var e3, t3;
            if (this.restIndex > this.restTotal)
              return G.debug("restIndex > restTotal"), "";
            var r2 = "", o2 = this.restHosts[this.restIndex], n2 = o2.domain, i2 = o2.ip, a2 = o2.port, s2 = this.https ? "https:" : "http:";
            return i2 && "undefined" != typeof window && "http:" === (null === (e3 = null === window || void 0 === window ? void 0 : window.location) || void 0 === e3 ? void 0 : e3.protocol) ? r2 = s2 + "//" + i2 + ":" + a2 : (r2 = s2 + "//" + n2, a2 && "80" !== a2 && "443" !== a2 && (r2 += ":".concat(a2)), "undefined" == typeof window || window.location || (r2 = "https://" + n2), "undefined" != typeof window && window.location && "file:" === (null === (t3 = window.location) || void 0 === t3 ? void 0 : t3.protocol) && (r2 = "https://" + n2)), "undefined" == typeof window && (r2 = s2 + "//" + n2), this.apiUrl = r2, r2;
          }
          var Vi = $2.getEnvInfo(), zi = Vi.global;
          d.util.Long = f(), d.configure();
          var Ji = d.Root.fromJSON({ nested: { easemob: { nested: { pb: { nested: { MessageBody: { fields: { type: { type: "Type", id: 1 }, from: { type: "JID", id: 2 }, to: { type: "JID", id: 3 }, contents: { rule: "repeated", type: "Content", id: 4 }, ext: { rule: "repeated", type: "KeyValue", id: 5 }, ackMessageId: { type: "uint64", id: 6 }, msgConfig: { type: "MessageConfig", id: 7 }, ackContent: { type: "string", id: 8 }, meta: { type: "string", id: 9 } }, nested: { Content: { fields: { type: { type: "Type", id: 1 }, text: { type: "string", id: 2 }, latitude: { type: "double", id: 3 }, longitude: { type: "double", id: 4 }, address: { type: "string", id: 5 }, displayName: { type: "string", id: 6 }, remotePath: { type: "string", id: 7 }, secretKey: { type: "string", id: 8 }, fileLength: { type: "int32", id: 9 }, action: { type: "string", id: 10 }, params: { rule: "repeated", type: "KeyValue", id: 11 }, duration: { type: "int32", id: 12 }, size: { type: "Size", id: 13 }, thumbnailRemotePath: { type: "string", id: 14 }, thumbnailSecretKey: { type: "string", id: 15 }, thumbnailDisplayName: { type: "string", id: 16 }, thumbnailFileLength: { type: "int32", id: 17 }, thumbnailSize: { type: "Size", id: 18 }, customEvent: { type: "string", id: 19 }, customExts: { rule: "repeated", type: "KeyValue", id: 20 }, buildingName: { type: "string", id: 21 } }, nested: { Type: { values: { TEXT: 0, IMAGE: 1, VIDEO: 2, LOCATION: 3, VOICE: 4, FILE: 5, COMMAND: 6, CUSTOM: 7 } }, Size: { fields: { width: { type: "double", id: 1 }, height: { type: "double", id: 2 } } } } }, Type: { values: { NORMAL: 0, CHAT: 1, GROUPCHAT: 2, CHATROOM: 3, READ_ACK: 4, DELIVER_ACK: 5, RECALL: 6, CHANNEL_ACK: 7 } }, MessageConfig: { fields: { allowGroupAck: { type: "bool", id: 1 } } } } }, KeyValue: { oneofs: { value: { oneof: ["varintValue", "floatValue", "doubleValue", "stringValue"] } }, fields: { key: { type: "string", id: 1 }, type: { type: "ValueType", id: 2 }, varintValue: { type: "int64", id: 3 }, floatValue: { type: "float", id: 4 }, doubleValue: { type: "double", id: 5 }, stringValue: { type: "string", id: 6 } }, nested: { ValueType: { values: { BOOL: 1, INT: 2, UINT: 3, LLINT: 4, FLOAT: 5, DOUBLE: 6, STRING: 7, JSON_STRING: 8 } } } }, JID: { fields: { appKey: { type: "string", id: 1 }, name: { type: "string", id: 2 }, domain: { type: "string", id: 3 }, clientResource: { type: "string", id: 4 } } }, ConferenceBody: { fields: { sessionId: { type: "string", id: 1 }, operation: { type: "Operation", id: 2 }, conferenceId: { type: "string", id: 3 }, type: { type: "Type", id: 4 }, content: { type: "string", id: 5 }, network: { type: "string", id: 6 }, version: { type: "string", id: 7 }, identity: { type: "Identity", id: 8 }, duration: { type: "string", id: 9 }, peerName: { type: "string", id: 10 }, endReason: { type: "EndReason", id: 11 }, status: { type: "Status", id: 12 }, isDirect: { type: "bool", id: 13 }, controlType: { type: "StreamControlType", id: 14 }, routeFlag: { type: "int32", id: 15 }, routeKey: { type: "string", id: 16 } }, nested: { Status: { fields: { errorCode: { type: "int32", id: 1 } } }, Operation: { values: { JOIN: 0, INITIATE: 1, ACCEPT_INITIATE: 2, ANSWER: 3, TERMINATE: 4, REMOVE: 5, STREAM_CONTROL: 6, MEDIA_REQUEST: 7 } }, Type: { values: { VOICE: 0, VIDEO: 1 } }, Identity: { values: { CALLER: 0, CALLEE: 1 } }, EndReason: { values: { HANGUP: 0, NORESPONSE: 1, REJECT: 2, BUSY: 3, FAIL: 4, UNSUPPORTED: 5, OFFLINE: 6 } }, StreamControlType: { values: { PAUSE_VOICE: 0, RESUME_VOICE: 1, PAUSE_VIDEO: 2, RESUME_VIDEO: 3 } } } }, MSync: { fields: { version: { type: "Version", id: 1, options: { default: "MSYNC_V1" } }, guid: { type: "JID", id: 2 }, auth: { type: "string", id: 3 }, compressAlgorimth: { type: "uint32", id: 4 }, crypto: { type: "uint32", id: 5 }, userAgent: { type: "string", id: 6 }, pov: { type: "uint64", id: 7 }, command: { type: "Command", id: 8 }, deviceId: { type: "uint32", id: 10 }, encryptType: { rule: "repeated", type: "EncryptType", id: 11, options: { packed: false } }, encryptKey: { type: "string", id: 12 }, payload: { type: "bytes", id: 9 } }, nested: { Version: { values: { MSYNC_V1: 0, MSYNC_V2: 1 } }, Command: { values: { SYNC: 0, UNREAD: 1, NOTICE: 2, PROVISION: 3 } } } }, EncryptType: { values: { ENCRYPT_NONE: 0, ENCRYPT_AES_128_CBC: 1, ENCRYPT_AES_256_CBC: 2 } }, CommSyncUL: { fields: { meta: { type: "Meta", id: 1 }, key: { type: "uint64", id: 2 }, queue: { type: "JID", id: 3 }, isRoam: { type: "bool", id: 4 }, lastFullRoamKey: { type: "uint64", id: 5 } } }, CommSyncDL: { fields: { status: { type: "Status", id: 1 }, metaId: { type: "uint64", id: 2 }, serverId: { type: "uint64", id: 3 }, metas: { rule: "repeated", type: "Meta", id: 4 }, nextKey: { type: "uint64", id: 5 }, queue: { type: "JID", id: 6 }, isLast: { type: "bool", id: 7 }, timestamp: { type: "uint64", id: 8 }, isRoam: { type: "bool", id: 9 } } }, CommNotice: { fields: { queue: { type: "JID", id: 1 } } }, CommUnreadUL: { fields: {} }, CommUnreadDL: { fields: { status: { type: "Status", id: 1 }, unread: { rule: "repeated", type: "MetaQueue", id: 2 }, timestamp: { type: "uint64", id: 3 } } }, MetaQueue: { fields: { queue: { type: "JID", id: 1 }, n: { type: "uint32", id: 2 } } }, Meta: { fields: { id: { type: "uint64", id: 1 }, from: { type: "JID", id: 2 }, to: { type: "JID", id: 3 }, timestamp: { type: "uint64", id: 4 }, ns: { type: "NameSpace", id: 5 }, payload: { type: "bytes", id: 6 }, routetype: { type: "RouteType", id: 7 }, ext: { type: "KeyValue", id: 8 }, meta: { type: "bytes", id: 9 } }, nested: { NameSpace: { values: { STATISTIC: 0, CHAT: 1, MUC: 2, ROSTER: 3, CONFERENCE: 4, NOTIFY: 5, QUERY: 6 } }, RouteType: { values: { ROUTE_ALL: 0, ROUTE_ONLINE: 1 } } } }, Status: { fields: { errorCode: { type: "ErrorCode", id: 1 }, reason: { type: "string", id: 2 }, redirectInfo: { rule: "repeated", type: "RedirectInfo", id: 3 } }, nested: { ErrorCode: { values: { OK: 0, FAIL: 1, UNAUTHORIZED: 2, MISSING_PARAMETER: 3, WRONG_PARAMETER: 4, REDIRECT: 5, TOKEN_EXPIRED: 6, PERMISSION_DENIED: 7, NO_ROUTE: 8, UNKNOWN_COMMAND: 9, PB_PARSER_ERROR: 10, BIND_ANOTHER_DEVICE: 11, IM_FORBIDDEN: 12, TOO_MANY_DEVICES: 13, PLATFORM_LIMIT: 14, USER_MUTED: 15, ENCRYPT_DISABLE: 16, ENCRYPT_ENABLE: 17, DECRYPT_FAILURE: 18, PERMISSION_DENIED_EXTERNAL: 19 } } } }, RedirectInfo: { fields: { host: { type: "string", id: 1 }, port: { type: "uint32", id: 2 } } }, Provision: { fields: { osType: { type: "OsType", id: 1 }, version: { type: "string", id: 2 }, networkType: { type: "NetworkType", id: 3 }, appSign: { type: "string", id: 4 }, compressType: { rule: "repeated", type: "CompressType", id: 5, options: { packed: false } }, encryptType: { rule: "repeated", type: "EncryptType", id: 6, options: { packed: false } }, encryptKey: { type: "string", id: 7 }, status: { type: "Status", id: 8 }, deviceUuid: { type: "string", id: 9 }, isManualLogin: { type: "bool", id: 10 }, password: { type: "string", id: 11 }, deviceName: { type: "string", id: 12 }, resource: { type: "string", id: 13 }, auth: { type: "string", id: 14 }, serviceId: { type: "string", id: 16 }, actionVersion: { type: "string", id: 17 } }, nested: { OsType: { values: { OS_IOS: 0, OS_ANDROID: 1, OS_LINUX: 2, OS_OSX: 3, OS_WIN: 4, OS_OTHER: 16 } }, NetworkType: { values: { NETWORK_NONE: 0, NETWORK_WIFI: 1, NETWORK_4G: 2, NETWORK_3G: 3, NETWORK_2G: 4, NETWORK_WIRE: 5 } }, CompressType: { values: { COMPRESS_NONE: 0, COMPRESS_ZLIB: 1 } } } }, MUCBody: { fields: { mucId: { type: "JID", id: 1 }, operation: { type: "Operation", id: 2 }, from: { type: "JID", id: 3 }, to: { rule: "repeated", type: "JID", id: 4 }, setting: { type: "Setting", id: 5 }, reason: { type: "string", id: 6 }, isChatroom: { type: "bool", id: 7 }, status: { type: "Status", id: 8 }, isThread: { type: "bool", id: 9 }, mucParentId: { type: "JID", id: 10 }, mucName: { type: "string", id: 11 }, eventInfo: { type: "EventInfo", id: 12 } }, nested: { Operation: { values: { CREATE: 0, DESTROY: 1, JOIN: 2, LEAVE: 3, APPLY: 4, APPLY_ACCEPT: 5, APPLY_DECLINE: 6, INVITE: 7, INVITE_ACCEPT: 8, INVITE_DECLINE: 9, KICK: 10, GET_BLACKLIST: 11, BAN: 12, ALLOW: 13, UPDATE: 14, BLOCK: 15, UNBLOCK: 16, PRESENCE: 17, ABSENCE: 18, DIRECT_JOINED: 19, ASSIGN_OWNER: 20, ADD_ADMIN: 21, REMOVE_ADMIN: 22, ADD_MUTE: 23, REMOVE_MUTE: 24, UPDATE_ANNOUNCEMENT: 25, DELETE_ANNOUNCEMENT: 26, UPLOAD_FILE: 27, DELETE_FILE: 28, ADD_USER_WHITE_LIST: 29, REMOVE_USER_WHITE_LIST: 30, BAN_GROUP: 31, REMOVE_BAN_GROUP: 32, THREAD_CREATE: 33, THREAD_DESTROY: 34, THREAD_JOIN: 35, THREAD_LEAVE: 36, THREAD_KICK: 37, THREAD_UPDATE: 38, THREAD_PRESENCE: 39, THREAD_ABSENCE: 40, DISABLE_GROUP: 41, ABLE_GROUP: 42, SET_METADATA: 43, DELETE_METADATA: 44, GROUP_MEMBER_METADATA_UPDATE: 45 } }, Setting: { fields: { name: { type: "string", id: 1 }, desc: { type: "string", id: 2 }, type: { type: "Type", id: 3 }, maxUsers: { type: "int32", id: 4 }, owner: { type: "string", id: 5 } }, nested: { Type: { values: { PRIVATE_OWNER_INVITE: 0, PRIVATE_MEMBER_INVITE: 1, PUBLIC_JOIN_APPROVAL: 2, PUBLIC_JOIN_OPEN: 3, PUBLIC_ANONYMOUS: 4 } } } }, Status: { fields: { errorCode: { type: "ErrorCode", id: 1 }, description: { type: "string", id: 2 } }, nested: { ErrorCode: { values: { OK: 0, PERMISSION_DENIED: 1, WRONG_PARAMETER: 2, MUC_NOT_EXIST: 3, USER_NOT_EXIST: 4, UNKNOWN: 5 } } } }, EventInfo: { fields: { eventType: { type: "EventType", id: 1, options: { default: "EVENT_NONE" } }, ext: { type: "string", id: 2 } }, nested: { EventType: { values: { EVENT_NONE: 0, CIRCLE_CHANNEL: 1 } } } } } }, RosterBody: { fields: { operation: { type: "Operation", id: 1 }, status: { type: "Status", id: 2 }, from: { type: "JID", id: 3 }, to: { rule: "repeated", type: "JID", id: 4 }, reason: { type: "string", id: 5 }, rosterVer: { type: "string", id: 6 }, biDirection: { type: "bool", id: 7 } }, nested: { Operation: { values: { GET_ROSTER: 0, GET_BLACKLIST: 1, ADD: 2, REMOVE: 3, ACCEPT: 4, DECLINE: 5, BAN: 6, ALLOW: 7, REMOTE_ACCEPT: 8, REMOTE_DECLINE: 9 } }, Status: { fields: { errorCode: { type: "ErrorCode", id: 1 }, description: { type: "string", id: 2 } }, nested: { ErrorCode: { values: { OK: 0, USER_NOT_EXIST: 1, USER_ALREADY_FRIEND: 2, USER_ALREADY_BLACKLIST: 3 } } } } } }, StatisticsBody: { fields: { operation: { type: "Operation", id: 1 }, os: { type: "OsType", id: 2 }, version: { type: "string", id: 3 }, network: { type: "NetworkType", id: 4 }, imTime: { type: "uint32", id: 5 }, chatTime: { type: "uint32", id: 6 }, location: { type: "string", id: 7 } }, nested: { Operation: { values: { INFORMATION: 0, USER_REMOVED: 1, USER_LOGIN_ANOTHER_DEVICE: 2, USER_KICKED_BY_CHANGE_PASSWORD: 3, USER_KICKED_BY_OTHER_DEVICE: 4 } }, OsType: { values: { OS_IOS: 0, OS_ANDROID: 1, OS_LINUX: 2, OS_OSX: 3, OS_WIN: 4, OS_OTHER: 16 } }, NetworkType: { values: { NETWORK_NONE: 0, NETWORK_WIFI: 1, NETWORK_4G: 2, NETWORK_3G: 3, NETWORK_2G: 4, NETWORK_WIRE: 5 } } } } } } } } } });
          Di.prototype.root = Ji;
          var Xi = function(e3) {
            this.onOpen = zi.onSocketOpen, this.onClose = zi.onSocketClose, this.onMessage = zi.onSocketMessage, this.onError = zi.onSocketError, this.close = zi.closeSocket, this.send = zi.sendSocketMessage, this.connectSocket = zi.connectSocket, this.readyState = 3, this.offSocketOpen = zi.offSocketOpen, this.offSocketMessage = zi.offSocketMessage, this.offSocketError = zi.offSocketError, this.offSocketClose = zi.offSocketClose, this.connect = function() {
              this.offSocketOpen(), this.offSocketMessage(), this.offSocketClose(), this.offSocketError(), zi.connectSocket({ url: e3.url, header: { "content-type": "application/json" }, success: function(e4) {
              }, fail: function() {
              } });
            };
          };
          Di.prototype._getSock = function() {
            var e3;
            return this.sock && this.sock.close && this.sock.close(), (e3 = "zfb" === Vi.platform || "dd" === Vi.platform ? new Xi(this) : zi.connectSocket({ url: this.url, header: { "content-type": "application/json" }, success: function(e4) {
            }, fail: function(e4) {
              e4.errMsg.indexOf("suspend");
            }, complete: function() {
            } })).connect && e3.connect(), e3;
          }, Di.prototype.getUniqueId = $2.getUniqueId, Di.prototype.deviceId = "miniProgram_" + Vi.platform;
          var Yi = G.getLogger("defaultLogger");
          Yi.setConfig({ useCache: false, maxCache: 3145728 }), Yi.enableAll(), $2.ajax = $2.wxRequest;
          var Qi = { connection: Di, message: fe, utils: $2, logger: Yi, statusCode: p };
        }(), o;
      }();
    });
  }
});
export default require_Easemob_chat();
//# sourceMappingURL=easemob-websdk_uniApp_Easemob-chat.js.map
