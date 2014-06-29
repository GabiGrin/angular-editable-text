Validation directive goals:
-Enable quick and simple out-of-the-box validation for forms
-Provide built in messages for most common validation errors around
-Enable custom error messages, configurable both per project and per form control element
-Allow custom validation checks with minimum effort and syntax
-Easy RegEx validation without implementing a custom boilerplate function
-Customizable reaction on validation errors - either show messages only at submit, or immediately / onBlur
-Allow scrolling to the first invalid form control to ensure user's attention
-Enter and exit css classes for nice looking visual effects
-Configurable error message template, both per project and per form control element
-Relies solely on ng-model to work, and can be attached to any other directive that may need validation
-Native bootstrap support



--Next:

-V Decide, and switch to a more isolated module name
-V Rename directive names
-V Upload demo page to github.io
-Work on readme, add specs
-Use JSHint + JSLint
-Publish to bower
-Test bower install from scratch


- TODO: think about whether it should pollute the scope or not - maybe consider transcluding


Spec:
 Form Options:
 -Submit function
 -Show validation errors trigger - onDirty / onBlur / onSubmit
 -Custom validation messages
 -Configurable on 3 tiers
 -Message for validated fields
 -Error type priorities




 Input Options:




Demo Scenarios:
They must include all customizable options and do so in a very humorous and stylish manner.
-Simple registration form with email address, age, full name,
-Demonstrate validation with a custom directive that uses ng-model
-Demo error type priority

test


Roadmap:
Message array support + randomizing errors!
Error message tiers for handling multiple errors

