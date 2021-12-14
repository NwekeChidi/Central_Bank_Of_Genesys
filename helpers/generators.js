


exports.account_number = () => {
    const len = String(Date.now()).length, rand = String(Date.now());
    return "60" + rand.substring(len-5, len-3) + rand.substring(len-2, len) + rand.substring(len-4, len-2) + rand.substring(len-6, len-4);
}

exports.cbg_number = () => {
    const len = String(Date.now()).length, rand = String(Date.now());
    return "10160" + rand.substring(len-4, len-2) + rand.substring(len-2, len) + rand.substring(len-2, len) + rand.substring(len-8, len-6) + rand.substring(len-10, len-8)
}

exports.card_number = (card_type) => {
    const len = String(Date.now()).length, rand = String(Date.now());
    if (card_type === "visa"){
        return "5066 " + rand.substring(len-6, len-2)+" "+ rand.substring(len-4, len)+" "+rand.substring(len-10, len-6);
    } else if (card_type === "mastercard"){
        return "5399 " + rand.substring(len-8, len-4)+" "+ rand.substring(len-10, len-6)+" "+rand.substring(len-4, len);
    } else if ( card_type === "verve"){
        return "5061 " + rand.substring(len-6, len-2)+" "+ rand.substring(len-4, len)+" "+rand.substring(len-10, len-6);
    } else if ( card_type === "crypty"){
        return "4422 " + rand.substring(len-10, len-6)+" "+ rand.substring(len-4, len)+" "+rand.substring(len-8, len-4);
    } else if (card_type === "dollar"){
        return "5000" + rand.substring(len-6, len-2)+" "+ rand.substring(len-4, len)+" "+rand.substring(len-10, len-6);
    }

}

exports.cvv = () => {
    return "7" + rand.substring(len-2, len);
}