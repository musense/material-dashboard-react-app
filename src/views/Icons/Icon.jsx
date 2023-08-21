import React from 'react';
import { MdFormatBold, MdFormatItalic, MdStrikethroughS, MdFormatUnderlined, MdFormatQuote, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight, MdFormatAlignJustify, MdFormatListNumbered, MdFormatListBulleted, MdInsertLink, MdLinkOff, MdVideoLibrary, MdImage, MdAdd, MdArrowForward, MdSmartButton, MdLogout, MdFormatColorFill, MdFormatColorText, MdCheck, MdOutlineStickyNote2, MdOutlineEdit, MdOutlineEditOff } from 'react-icons/md'
import { BsTypeH1, BsTypeH2, BsTypeH3, BsCameraVideoFill, BsCode, BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { FaSuperscript, FaSubscript } from 'react-icons/fa'
import { AiOutlineEdit, AiOutlineTable, AiOutlineInsertRowBelow, AiOutlineInsertRowRight, AiOutlineDelete, AiFillTag, AiOutlineUpload, AiOutlineArrowsAlt, AiOutlineInsertRowAbove, AiOutlineInsertRowLeft, AiFillHtml5, AiOutlineDeleteRow, AiOutlineDeleteColumn } from 'react-icons/ai'
import { SiLatex } from 'react-icons/si'
import { BiHide } from 'react-icons/bi'
import {
    PiAlignLeftSimple,
    PiAlignCenterHorizontalSimple,
    PiAlignRightSimple
} from 'react-icons/pi'
const iconList = {
    bold: <MdFormatBold size={20} />,
    italic: <MdFormatItalic size={20} />,
    strikethrough: <MdStrikethroughS size={20} />,
    underline: <MdFormatUnderlined size={20} />,
    code: <BsCode size={20} />,
    hide: <BiHide size={20} />,
    headingOne: <BsTypeH1 size={20} />,
    headingTwo: <BsTypeH2 size={20} />,
    headingThree: <BsTypeH3 size={20} />,

    blockquote: <MdFormatQuote size={20} />,
    superscript: <FaSuperscript size={15} />,
    subscript: <FaSubscript size={15} />,
    alignLeft: <MdFormatAlignLeft size={20} />,
    alignCenter: <MdFormatAlignCenter size={20} />,
    alignRight: <MdFormatAlignRight size={20} />,
    alignJustify: <MdFormatAlignJustify size={20} />,
    orderedList: <MdFormatListNumbered size={20} />,
    unorderedList: <MdFormatListBulleted size={20} />,
    link: <MdInsertLink size={20} />,
    linkOff: <MdLinkOff size={20} />,
    image: <MdImage size={20} />,
    video: <MdVideoLibrary size={20} />,
    add: <MdAdd size={20} />,
    table: <AiOutlineTable size={20} />,
    insertRowBelow: <AiOutlineInsertRowBelow size={25} />,
    insertColumnRight: <AiOutlineInsertRowRight size={25} />,
    insertColumnLeft: <AiOutlineInsertRowLeft size={25} />,
    insertRowAbove: <AiOutlineInsertRowAbove size={25} />,
    trashCan: <AiOutlineDelete size={25} />,
    addId: <AiFillTag size={20} />,
    upload: <AiOutlineUpload size={20} />,
    equation: <SiLatex size={20} />,
    resize: <AiOutlineArrowsAlt size={20} />,
    videoPlayer: <BsCameraVideoFill size={20} />,
    insertHtml: <AiFillHtml5 size={20} />,
    arrowRight: <MdArrowForward size={35} />,
    arrowUp: <BsArrowUp size={15} />,
    arrowDown: <BsArrowDown size={15} />,
    pen: <AiOutlineEdit size={20} />,
    edit: <MdOutlineEdit size={20} />,
    editOff: <MdOutlineEditOff size={20} />,
    smartButton: <MdSmartButton size={20} />,
    logout: <MdLogout size={25} color='white' title='logout' />,
    tableToLeft: <PiAlignLeftSimple size={25} />,
    tableToCenter: <PiAlignCenterHorizontalSimple size={25} />,
    tableToRight: <PiAlignRightSimple size={25} />,
    deleteRow: <AiOutlineDeleteRow size={25} />,
    deleteColumn: <AiOutlineDeleteColumn size={25} />,
    backgroundColorPicker: <MdFormatColorFill size={20} color="inherit" />,
    colorPicker: <MdFormatColorText size={20} color="inherit" />,
    check: <MdCheck size={20} color='inherit' />,
    note: <MdOutlineStickyNote2 size={25} />,
}

const Icon = (props) => {
    const { icon } = props
    return (
        iconList[icon]
    )
}

export default Icon;