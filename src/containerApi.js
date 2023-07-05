/**
 * Defines the message API to communicate with our containing iFrame
 */

window.GC_API = {
    GameLoaded: "GameLoaded",
    BreadCrumb: "BreadCrumb",
    FinalScores: "FinalScores",
};

window.CG_API = {
    InitGame: "InitGame",
}

window.MESSAGE_FACTORY = function(name, data) {
    return JSON.stringify({
        type: name,
        data: data,
    });
}
