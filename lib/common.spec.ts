import expect = require("expect.js");
import {isDefined} from "./common";

describe("Common", () => {
    describe("isDefined", () => {
        it("should return false if the overhanded value is null or undefined", () => {
            expect(isDefined(null)).not.to.be.ok();
            expect(isDefined(undefined)).not.to.be.ok();
        });

        it("should return true if the overhanded value is defined", () => {
            expect(isDefined("str")).to.be.ok();
        });
    });
});