import React from "react";
import "../App.css"

export default function RequiredFooter() {

    /*
     * This is required due to the constraint on the arXiv API page (https://arxiv.org/help/api) that reads
     *
     * For all API users, ... Acknowledge arXiv data usage with this statement on your product:
     * “Thank you to arXiv for use of its open access interoperability.”
     */

    return (
        <div className="footer top-border-drop-shadow">
            <p>Thank you to arXiv for use of its open access interoperability.</p>
        </div>
    )
}


