function addRowLockOnFlights(flightId) {
    return `SELECT * FROM flights WHERE Flights.id = ${flightId} FOR UPDATE`
}

module.exports = {
    addRowLockOnFlights
}