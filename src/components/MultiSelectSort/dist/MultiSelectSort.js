"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_select_1 = require("react-select");
var react_sortable_hoc_1 = require("react-sortable-hoc");
var creatable_1 = require("react-select/creatable");
function arrayMove(array, from, to) {
    var slicedArray = array.slice();
    slicedArray.splice(to < 0 ? array.length + to : to, 0, slicedArray.splice(from, 1)[0]);
    return slicedArray;
}
var SortableMultiValue = react_sortable_hoc_1.SortableElement(function (props) {
    // this prevents the menu from being opened/closed when the user clicks
    // on a value to begin dragging it. ideally, detecting a click (instead of
    // a drag) would still focus the control and toggle the menu, but that
    // requires some magic with refs that are out of scope for this example
    var onMouseDown = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var innerProps = __assign(__assign({}, props.innerProps), { onMouseDown: onMouseDown });
    return react_1["default"].createElement(react_select_1.components.MultiValue, __assign({}, props, { innerProps: innerProps }));
});
var SortableMultiValueLabel = react_sortable_hoc_1.SortableHandle(function (props) { return react_1["default"].createElement(react_select_1.components.MultiValueLabel, __assign({}, props)); });
var SortableSelect = react_sortable_hoc_1.SortableContainer(creatable_1["default"]);
function MultiSelectSort(_a) {
    var _b = _a.isMulti, isMulti = _b === void 0 ? true : _b, options = _a.options, setSelectedItems = _a.setSelectedItems, _c = _a.selectedItems, selectedItems = _c === void 0 ? [] : _c;
    var _d = react_1["default"].useState(), selected = _d[0], setSelected = _d[1];
    var _e = react_1["default"].useState(), value = _e[0], setValue = _e[1];
    react_1.useEffect(function () {
        setSelected(selectedItems);
    }, [selectedItems]);
    var onChange = function (selectedOptions) {
        setSelected(selectedOptions);
        setSelectedItems(selectedOptions);
    };
    var onSingleChange = function (newValue, actionMeta) {
        setValue(newValue);
        setSelectedItems([newValue]);
    };
    var onSortEnd = function (_a) {
        var oldIndex = _a.oldIndex, newIndex = _a.newIndex;
        var newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
        setSelectedItems(newValue);
        // console.log('Values sorted:',newValue.map((i) => i.value));
    };
    if (isMulti) {
        return (react_1["default"].createElement(SortableSelect, { isMulti: true, useDragHandle: true, 
            // react-sortable-hoc props:
            axis: 'xy', onSortEnd: onSortEnd, distance: 10, 
            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
            getHelperDimensions: function (_a) {
                var node = _a.node;
                return node.getBoundingClientRect();
            }, 
            // react-select props:
            options: options, value: selected, onChange: onChange, styles: {
                menuPortal: function (base) { return (__assign(__assign({}, base), { zIndex: 9999 })); },
                menu: function (base) { return (__assign(__assign({}, base), { zIndex: 99999 })); }
            }, components: {
                // @ts-ignore We're failing to provide a required index prop to SortableElement
                MultiValue: SortableMultiValue,
                // @ts-ignore We're failing to provide a required index prop to SortableElement
                MultiValueLabel: SortableMultiValueLabel
            }, closeMenuOnSelect: false }));
    }
    else {
        return (react_1["default"].createElement(react_select_1["default"]
        // react-sortable-hoc props:
        //  axis='xy'
        //  distance={10}
        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
        //  getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        // react-select props:
        , { 
            // react-sortable-hoc props:
            //  axis='xy'
            //  distance={10}
            // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
            //  getHelperDimensions={({ node }) => node.getBoundingClientRect()}
            // react-select props:
            options: options, isClearable: true, isSearchable: true, 
            //  value         = { selected }
            value: value, onChange: onSingleChange, styles: {
                menuPortal: function (base) { return (__assign(__assign({}, base), { zIndex: 9999 })); },
                menu: function (base) { return (__assign(__assign({}, base), { zIndex: 99999, color: 'black' })); }
            } }));
    }
}
exports["default"] = MultiSelectSort;
