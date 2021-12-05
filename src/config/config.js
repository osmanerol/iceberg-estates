const BASE_URL = process.env.VUE_APP_BASE_URL

const url = {
  GET_APPOINTMENTS: `${BASE_URL}/Appointments?maxRecords=3&view=Grid%20view`
}

export default url