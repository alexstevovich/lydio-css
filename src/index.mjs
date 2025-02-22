export class Property {
    constructor(name, value = '') {
        this.name = name;
        this.value = value;
        this.modifiers = []; // Stores `!important` and other flags
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    important() {
        this.modifiers.push('!important');
        return this;
    }

    addModifier(modifier) {
        this.modifiers.push(modifier);
        return this;
    }

    toCss() {
        return `${this.name}: ${this.value}${this.modifiers.length ? ' ' + this.modifiers.join(' ') : ''};`.trim();
    }
    

    /** ✅ Creates a deep copy of this Property */
    clone() {
        const newProp = new Property(this.name, this.value);
        newProp.modifiers = [...this.modifiers]; // Copy array
        return newProp;
    }
}

export class Rule {
    constructor(selectors = []) {
        this.selectors = Array.isArray(selectors) ? selectors : [selectors];
        this.properties = [];
        this.nestedRules = [];
    }

    addSelector(selector) {
        this.selectors.push(selector);
        return this;
    }

    select(selector) {
        return this.addSelector(selector);
    }

    createProperty(name) {
        return new Property(name);
    }

    addAndGetProperty(name, value) {
        const property = new Property(name, value);
        this.properties.push(property);
        return property;
    }

    addProperty(name, value) {
        this.addAndGetProperty(name, value);
        return this;
    }

    prop(name, value) {
        return this.addProperty(name, value);
    }

    nest(selector) {
        const rule = new Rule(selector);
        this.nestedRules.push(rule);
        return rule;
    }

    apply(properties) {
        Object.entries(properties).forEach(([key, value]) => {
            this.addProperty(key, value);
        });
        return this;
    }

    toCss() {
        const propertiesCss = this.properties.map(p => p.toCss()).join('\n  ');
        const nestedCss = this.nestedRules.map(r => r.toCss()).join('\n');

        return `${this.selectors.join(', ')} {\n  ${propertiesCss}\n}\n${nestedCss}`.trim();
    }

    get css() {
        return this.toCss();
    }

    /** ✅ Creates a deep copy of this Rule */
    clone() {
        const newRule = new Rule([...this.selectors]); // Clone selectors
        newRule.properties = this.properties.map(p => p.clone()); // Clone properties
        newRule.nestedRules = this.nestedRules.map(r => r.clone()); // Clone nested rules
        return newRule;
    }
}

export class RuleCollection {
    constructor() {
        this.rules = [];
    }

    rule(selector) {
        const rule = new Rule(selector);
        this.rules.push(rule);
        return rule;
    }

    add(rule) {
        if (rule instanceof Rule || rule instanceof RuleCollection) {
            this.rules.push(rule);
        } else {
            throw new Error("Only Rule or Collection objects can be added.");
        }
        return this;
    }

    addAndGet(rule) {
        this.add(rule)
        return rule
    }


    toCss() {
        return this.rules.map(rule => rule.toCss()).join('\n\n');
    }

    get css() {
        return this.toCss();
    }

    /** ✅ Creates a deep copy of this Collection */
    clone() {
        const newCollection = new Collection();
        newCollection.rules = this.rules.map(r => r.clone()); // Clone rules
        return newCollection;
    }
}

/** ✅ Utility: Apply properties to multiple rules at once */
export function applyPropertiesToRules(rules, properties) {
    rules.forEach(rule => rule.applyProperties(properties));
}
