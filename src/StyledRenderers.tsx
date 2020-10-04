import * as React from "react";

function renderParagraph(props) {
    return (
        <p className="mb-4">{props.children}</p>
    )
}

function renderHeading(props) {
    switch(props.level) {
        case 1:
            return (
                <h1 className="text-3xl font-bold mb-2">{props.children}</h1>
            );
        case 2:
            return (
                <h2  className="text-2xl font-bold mb-2">{props.children}</h2>
            );
        case 3:
            return (
                <h3  className="text-xl mb-1">{props.children}</h3>
            );
        case 4:
            return (
                <h4  className="text-lg mb-1">{props.children}</h4>
            );
        default:
            return (
                <p>{props.children}</p>
            )
    }
}

function renderList(props) {
    console.log(props)
    return (
        <ul className="list-disc list-inside mb-4 pl-4">
            {props.children}
        </ul>
    )
}

const renderers = {
    paragraph: renderParagraph,
    heading: renderHeading,
    list: renderList
};

export default renderers;