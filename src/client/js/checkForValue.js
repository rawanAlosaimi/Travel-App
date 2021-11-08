function checkForValue(formlocation, date) {
    if (formlocation === "" || date === "") {
        return false;
    }
    return true;
}

export { checkForValue }
