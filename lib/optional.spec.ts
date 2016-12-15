import expect = require('expect.js');
import {Optional} from "./optional";

describe("Optional", () => {

    describe(".of", () => {
        it("should throw an error if called with null", () => {
            expect(() => Optional.of(null)).to.throwError();
        });

        it("should throw an error if called with undefined", () => {
            expect(() => Optional.of(undefined)).to.throwError();
        });

        it("should accept a non-null value", () => {
            expect(() => Optional.of<string>("str")).to.not.throwError();
            expect(Optional.of<string>("str").get()).to.equal("str");
        });
    });

    describe(".ofNullable", () => {
        it("should accept null and defined values", () => {
            expect(() => Optional.ofNullable(null)).not.to.throwError();
            expect(() => Optional.ofNullable<string>("str")).not.to.throwError();
            expect(Optional.ofNullable<string>("str").get()).to.equal("str");
        });

        it("should throw an error if called with undefined", () => {
            expect(() => Optional.ofNullable(undefined)).to.throwError();
        });
    });

    describe(".isPresent", () => {
        it("should return true if value is present", () => {
           expect(Optional.of("str").isPresent()).to.be.ok();
        });

        it("should return false if value is not present", () => {
            expect(Optional.ofNullable(null).isPresent()).not.to.be.ok();
            expect(Optional.empty().isPresent()).not.to.be.ok();
        });
    });

    describe(".map", () => {
        it("should return an optional with the mapped result", () => {
           expect(Optional.of("str").map<number>(value => value.indexOf('s')).get()).to.be(0);
        });

        it("should not call the mapping function if optional is empty", () => {
            expect(Optional.empty<string>().map<number>(value => {throw Error("should not be called")}).isPresent()).not.to.be.ok();
        });
    });

    describe(".flatMap", () => {
        it("should return an optional with the mapped result", () => {
            expect(Optional.of("str").flatMap<number>(value => Optional.of(value.indexOf('s'))).get()).to.be(0);
        });

        it("should not call the mapping function if optional is empty", () => {
            expect(Optional.empty<string>().flatMap<number>(value => {throw Error("should not be called")}).isPresent()).not.to.be.ok();
        });
    });

    describe(".filter", () => {
       it("should not call the filter function if optional is empty", () => {
            expect(Optional.empty<string>().filter(value => {throw new Error("should not be called")}).isPresent()).not.to.be.ok();
       });

       it("should return an empty optional if the filter returns false", () => {
            expect(Optional.of<string>("str").filter(value => value !== "str").isPresent()).not.to.be.ok();
       });

        it("should return an filled optional if the filter returns true", () => {
            expect(Optional.of<string>("str").filter(value => value === "str").get()).to.equal("str");
        });

    });

    describe(".orElse", () => {
        it("should return the old value if any is present", () => {
            expect(Optional.of<string>("str").orElse("other")).to.equal("str");
        });

        it("should return the overhanded value if optional is empty", () => {
            expect(Optional.empty<string>().orElse("other")).to.equal("other");
        });
    });

    describe(".ifPresent", () => {
        it("should only call the callback if optional is not empty", () => {
            expect(() => Optional.empty<string>().ifPresent(() => {throw new Error("should not be called");})).not.to.throwError();
            expect(() => Optional.of<string>("str").ifPresent(() => {throw new Error("must be called")})).to.throwError();
        });
    });

    describe(".orElseGet", () => {
        it("should use the supplied value if optional is empty", () => {
            expect(Optional.empty<string>().orElseGet(() => "str")).to.equal("str");
        });

        it("should not call the supply function if optional has value", () => {
            expect(Optional.of<string>("str").orElseGet(() => {throw new Error("should not be called")})).to.equal("str");
        });
    });

    describe(".orElseThrow", () => {
        it("should throw the given error if optional is empty", () => {
            expect(() => Optional.empty<string>().orElseThrow<RangeError>(() => new TypeError("error"))).to.throwError();
        });

        it("should not throw the given error if optional has value", () => {
            expect(Optional.of<string>("str").orElseThrow<RangeError>(() => new TypeError("error"))).to.equal("str");
        });
    });

    describe(".get", () => {
        it("should throw an error if optional is empty", () => {
            expect(() => Optional.empty().get()).to.throwError();
        });
    });

    describe(".ofAnything", () => {
        it("should never throw an error", () => {
            expect(Optional.ofAnything(null).isPresent()).not.to.be.ok();
            expect(Optional.ofAnything(undefined).isPresent()).not.to.be.ok();
            expect(Optional.ofAnything<string>("str").get()).to.be("str");
        });
    })
});