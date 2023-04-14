"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var MultiSelectSort_1 = require("./MultiSelectSort");
var GetClassAction_1 = require("./../../actions/GetClassAction");
function SingleParentCatSelectSort(_a) {
    var setSelectedItems = _a.setSelectedItems, selectedItems = _a.selectedItems;
    var dispatch = react_redux_1.useDispatch();
    var classList = react_redux_1.useSelector(function (state) {
        return state.getClassReducer.classList;
    });
    // console.log(
    //   '🚀 ~ file: SingleParentCatSelectSort.tsx:18 ~ SingleParentCatSelectSort ~ classList:',
    //   classList
    // );
    var _b = react_1.useState(), classOptions = _b[0], setClassOptions = _b[1];
    var defaultOptions = react_1.useMemo(function () {
        var tempList = [], counter = 0;
        for (var _i = 0, _a = classList.keys(); _i < _a.length; _i++) {
            var name = _a[_i];
            var tempObj = {
                value: counter++,
                label: name
            };
            tempList.push(tempObj);
        }
        return tempList;
    }, [classList]);
    react_1.useEffect(function () {
        setClassOptions(defaultOptions);
        dispatch({
            type: GetClassAction_1.SET_PARENT_CLASS_OPTIONS,
            payload: defaultOptions
        });
    }, [defaultOptions]);
    return (react_1["default"].createElement(MultiSelectSort_1["default"], { isMulti: false, options: classOptions, setSelectedItems: setSelectedItems, selectedItems: selectedItems }));
}
exports["default"] = SingleParentCatSelectSort;
