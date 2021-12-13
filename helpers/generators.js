exports.account_number = () => {
    const len = String(Date.now()).length, rand = String(Date.now())
    return "60" + rand.substring(len-4, len-2) + rand.substring(len-2, len) + rand.substring(len-8, len-6) + rand.substring(len-6, len-4);
}

exports.cbg_number = () => {
    const len = String(Date.now()).length, rand = String(Date.now())
    return "10160" + rand.substring(len-4, len-2) + rand.substring(len-2, len) + rand.substring(len-2, len) + rand.substring(len-8, len-6) + rand.substring(len-6, len-4)
}