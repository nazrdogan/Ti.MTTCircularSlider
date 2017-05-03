var CGRectMake = require('CoreGraphics').CGRectMake,
    UIColor = require('UIKit/UIColor'),
    UIScreen = require('UIKit/UIScreen'), 
    UIControlEventValueChanged = require("UIKit").UIControlEventValueChanged,
    UIControlEventEditingDidEnd = require("UIKit").UIControlEventEditingDidEnd;
     
var MTTCircularSlider = require("MTTCircularSlider/MTTCircularSlider");

var circularSlider = new MTTCircularSlider();
var bounds = UIScreen.mainScreen.bounds;
circularSlider.frame = CGRectMake(20, 30, bounds.size.width - 40, bounds.size.height - 100);

var CircularSliderDelegate = Hyperloop.defineClass('CircularSliderDelegate', 'NSObject');

CircularSliderDelegate.addMethod({
    selector : 'valueChanged:',
    instance : true,
    arguments : ['MTTCircularSlider'],
    callback : function(sender) {
        if (this.valueChanged) {
            this.valueChanged(sender);
        }
    }
});

CircularSliderDelegate.addMethod({
    selector : 'editingDidEnd:',
    instance : true,
    arguments : ['MTTCircularSlider'],
    callback : function(sender) {
        if (this.editingDidEnd) {
            this.editingDidEnd(sender);
        }
    }
});


var delegate = new CircularSliderDelegate();

delegate.valueChanged = function(sender) {
    Ti.API.info('Value Changed');
    Ti.API.info(circularSlider.value);
};

delegate.editingDidEnd = function(sender) {
    Ti.API.info('Editing Did End');
    Ti.API.info(circularSlider.value);
};


circularSlider.addTargetActionForControlEvents(delegate, "valueChanged:", UIControlEventValueChanged);
circularSlider.addTargetActionForControlEvents(delegate, "editingDidEnd:", UIControlEventEditingDidEnd);


$.index.add(circularSlider);
$.index.open();
