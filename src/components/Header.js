import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {TOP_TABS} from "../Globals";
import Button from "@material-ui/core/Button";


export default function Header() {
    const history = useHistory()

    const [thisSection, setThisSection] = useState(TOP_TABS.ARTICLE_PAGE)

    useEffect(() => {

    }, [thisSection])

    return (
        <div className="header bottom-border-drop-shadow">
            <Button
                color="primary"
                onClick={() => {
                    history.push('/')
                    setThisSection(TOP_TABS.ARTICLE_PAGE)
                }}
                variant={thisSection === TOP_TABS.ARTICLE_PAGE ? "outlined" : "text"}>
                {TOP_TABS.ARTICLE_PAGE}
            </Button>
            <Button
                style={{marginLeft: '1rem'}}
                color="primary"
                onClick={() => {
                    history.push('/author_list/')
                    setThisSection(TOP_TABS.AUTHOR_PAGE)
                }}
                variant={thisSection === TOP_TABS.AUTHOR_PAGE ? "outlined" : "text"}>
                {TOP_TABS.AUTHOR_PAGE}
            </Button>
        </div>
    )
}



