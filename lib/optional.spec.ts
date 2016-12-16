import expect = require('expect.js');
import {Optional} from "./optional";

describe("Optional", () => {

    describe(".from", () => {
        it("should throw an error if called with null", () => {
            expect(() => Optional.from(null)).to.throwError();
        });

        it("should throw an error if called with undefined", () => {
            expect(() => Optional.from(undefined)).to.throwError();
        });

        it("should accept a non-null value", () => {
            expect(() => Optional.from<string>("str")).to.not.throwError();
            expect(Optional.from<string>("str").getValue()).to.equal("str");
        });
    });

    describe(".fromNullable", () => {
        it("should accept null and defined values", () => {
            expect(() => Optional.fromNullable(null)).not.to.throwError();
            expect(() => Optional.fromNullable<string>("str")).not.to.throwError();
            expect(Optional.fromNullable<string>("str").getValue()).to.equal("str");
        });

        it("should throw an error if called with undefined", () => {
            expect(() => Optional.fromNullable(undefined)).to.throwError();
        });
    });

    describe(".isDefined", () => {
        it("should return true if value is present", () => {
           expect(Optional.from("str").isDefined()).to.be.ok();
        });

        it("should return false if value is not present", () => {
            expect(Optional.fromNullable(null).isDefined()).not.to.be.ok();
            expect(Optional.fromNothing().isDefined()).not.to.be.ok();
        });
    });

    describe(".map", () => {
        it("should return an optional with the mapped result", () => {
           expect(Optional.from("str").map<number>(value => value.indexOf('s')).getValue()).to.be(0);
        });

        it("should not call the mapping function if optional is empty", () => {
            expect(Optional.fromNothing<string>().map<number>(value => {throw Error("should not be called")}).isDefined()).not.to.be.ok();
        });
    });

    describe(".flatMap", () => {
        it("should return an optional with the mapped result", () => {
            expect(Optional.from("str").flatMap<number>(value => Optional.from(value.indexOf('s'))).getValue()).to.be(0);
        });

        it("should not call the mapping function if optional is empty", () => {
            expect(Optional.fromNothing<string>().flatMap<number>(value => {throw Error("should not be called")}).isDefined()).not.to.be.ok();
        });
    });

    describe(".filter", () => {
       it("should not call the filter function if optional is empty", () => {
            expect(Optional.fromNothing<string>().filter(value => {throw new Error("should not be called")}).isDefined()).not.to.be.ok();
       });

       it("should return an empty optional if the filter returns false", () => {
            expect(Optional.from<string>("str").filter(value => value !== "str").isDefined()).not.to.be.ok();
       });

        it("should return an filled optional if the filter returns true", () => {
            expect(Optional.from<string>("str").filter(value => value === "str").getValue()).to.equal("str");
        });

    });

    describe(".orElse", () => {
        it("should return the old value if any is present", () => {
            expect(Optional.from<string>("str").orElse("other")).to.equal("str");
        });

        it("should return the overhanded value if optional is fromNothing", () => {
            expect(Optional.fromNothing<string>().orElse("other")).to.equal("other");
        });
    });

    describe(".ifDefined", () => {
        it("should only call the callback if optional is not empty", () => {
            expect(() => Optional.fromNothing<string>().ifDefined(() => {throw new Error("should not be called");})).not.to.throwError();
            expect(() => Optional.from<string>("str").ifDefined(() => {throw new Error("must be called")})).to.throwError();
        });
    });

    describe(".orElseCall", () => {
        it("should use the supplied value if optional is empty", () => {
            expect(Optional.fromNothing<string>().orElseCall(() => "str")).to.equal("str");
        });

        it("should not call the supply function if optional has value", () => {
            expect(Optional.from<string>("str").orElseCall(() => {throw new Error("should not be called")})).to.equal("str");
        });
    });

    describe(".orElseThrow", () => {
        it("should throw the given error if optional is empty", () => {
            expect(() => Optional.fromNothing<string>().orElseThrow<RangeError>(() => new TypeError("error"))).to.throwError();
        });

        it("should not throw the given error if optional has value", () => {
            expect(Optional.from<string>("str").orElseThrow<RangeError>(() => new TypeError("error"))).to.equal("str");
        });
    });

    describe(".getValue", () => {
        it("should throw an error if optional is empty", () => {
            expect(() => Optional.fromNothing().getValue()).to.throwError();
        });
    });

    describe(".fromAnything", () => {
        it("should never throw an error", () => {
            expect(Optional.fromAnything(null).isDefined()).not.to.be.ok();
            expect(Optional.fromAnything(undefined).isDefined()).not.to.be.ok();
            expect(Optional.fromAnything<string>("str").getValue()).to.be("str");
        });
    })
});