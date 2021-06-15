import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";


export default function BackButton({customText}) {
    const history = useHistory()

    return (
        <div>
            <Button
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={() => history.goBack()}
                variant={"text"}>
                {customText? customText : "Back"}
            </Button>
        </div>
    )
}
