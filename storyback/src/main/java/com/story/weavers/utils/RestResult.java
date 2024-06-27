package com.story.weavers.utils;

import java.io.Serializable;

public class RestResult implements Serializable {
    private RestResult.Type type;
    private Object data;
    private Integer code = 200;
    private String msg;

    public RestResult() {
    }

    public RestResult(RestResult.Type type, Object data, String msg) {
        this.type = type;
        this.data = data;
        this.msg = msg;
    }

    public RestResult(RestResult.Type type, Integer code, Object data, String msg) {
        this.type = type;
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public static RestResult success(Object data, String msg) {
        return new RestResult(RestResult.Type.success, data, msg);
    }

    public static RestResult success(String msg) {
        return new RestResult(RestResult.Type.success, msg, msg);
    }

    public static RestResult error(Integer code, Object data, String msg) {
        if (null == data || "".equals(data.toString())) {
            data = msg;
        }

        return new RestResult(RestResult.Type.error, code, data, msg);
    }

    public static RestResult error(Object data, String msg) {
        if (null == data || "".equals(data.toString())) {
            data = msg;
        }

        return new RestResult(RestResult.Type.error, ResultConstant.ERRORCODE_DEFAULT, data, msg);
    }

    public static RestResult error(String msg) {
        return new RestResult(RestResult.Type.error, ResultConstant.ERRORCODE_DEFAULT, msg, msg);
    }

    public static RestResult warn(Object data, String msg) {
        return new RestResult(RestResult.Type.warn, ResultConstant.WARNCODE_DEFAULT, data, msg);
    }

    public RestResult.Type getType() {
        return this.type;
    }

    public void setType(RestResult.Type type) {
        this.type = type;
    }

    public Object getData() {
        return this.data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCode() {
        return this.code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String toString() {
        return "RestResult{type=" + this.type + ", code=" + this.code + ", data=" + this.data + ", msg='" + this.msg + '\'' + '}';
    }

    public static enum Type {
        success,
        error,
        warn;

        private Type() {
        }
    }
}
