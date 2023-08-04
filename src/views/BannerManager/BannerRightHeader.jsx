import React from "react";
import CardHeader from "../../components/Card/CardHeader";

const BannerRightHeader = ({title}) => {
    return <CardHeader color='primary'>
        <h4>{title}</h4>
    </CardHeader>;
}

export default BannerRightHeader;

