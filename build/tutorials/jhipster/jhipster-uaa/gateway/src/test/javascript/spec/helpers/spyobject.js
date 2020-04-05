export class SpyObject {
    static stub(object = null, config = null, overrides = null) {
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        const m = {};
        Object.keys(config).forEach(key => (m[key] = config[key]));
        Object.keys(overrides).forEach(key => (m[key] = overrides[key]));
        Object.keys(m).forEach(key => {
            object.spy(key).andReturn(m[key]);
        });
        return object;
    }
    constructor(type = null) {
        if (type) {
            Object.keys(type.prototype).forEach(prop => {
                let m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (e) {
                    // As we are creating spys for abstract classes,
                    // these classes might have getters that throw when they are accessed.
                    // As we are only auto creating spys for methods, this
                    // should not matter.
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            });
        }
    }
    spy(name) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    }
    prop(name, value) {
        this[name] = value;
    }
    /** @internal */
    _createGuinnessCompatibleSpy(name) {
        const newSpy = jasmine.createSpy(name);
        newSpy.andCallFake = newSpy.and.callFake;
        newSpy.andReturn = newSpy.and.returnValue;
        newSpy.reset = newSpy.calls.reset;
        // revisit return null here (previously needed for rtts_assert).
        newSpy.and.returnValue(null);
        return newSpy;
    }
}
