/**
 * One collection to link user UID to public address. Read only for the uid account
 * One collection to link restaurant UID to name and public address. Read only for public
 * One collection for requests to link restaurant UID to requests. Read only for the uid account
 *
 * User search for restaurant slots - Get restaurant address using restaurant name from firebase.
 * Search the blockchain for the available slots and retrieve the hash of the chosen one
 *
 * User make request - User sign in to firebase, send token to backend, backend retrieves public address,
 * backend sends address and slot hash to restaurant
 *
 * 0xD2204B472EfbBf15097E01E2E905606C547A57E6 - Contract address
 *
 * organise restaurant accepted reservations by date (retrieve by date)
 * use dates as keys to results
 */
