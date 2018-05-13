import axios from "axios/index";

export function getSections() {
    let initialCategory = [];
  return axios.get('http://127.0.0.1:8200/newLots')
        .then(response => {
            initialCategory = response.data.result.map((category) => {
                return category;
            });
            return initialCategory;
        }).catch(function (error) {
        console.log(error);
    });
}
