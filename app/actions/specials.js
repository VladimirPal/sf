export const GET_SPECIALS = 'GET_SPECIALS';
export const SAVE_SPECIAL = 'SAVE_SPECIAL';
export const UPDATE_SPECIAL = 'UPDATE_SPECIAL';
export const DELETE_SPECIAL = 'DELETE_SPECIAL';


export function getSpecials(day) {
  let Specials = Parse.Object.extend('Specials');
  let query = new Parse.Query(Specials);
  query.equalTo('Dates', day);

  return dispatch => {
    dispatch(
      (() => {
        return {
          type: GET_SPECIALS,
          specials: [],
          inLoad: true
        };
      })()
    );

    return query.find({
      success: (results) => {
        return dispatch( (() => {
          return {
            type: GET_SPECIALS,
            specials: results,
            inLoad: false
          };
        })())
      }
    });
  }
}


export function saveSpecial(special) {
  return dispatch => {
    return special.save(null,
      {
        success: (special) => {
          return dispatch( (() => {
            return {
              type: SAVE_SPECIAL,
              special: special
            };
          })())
        },
      }
    );

  }
}

export function updateSpecial(special) {
  return dispatch => {
    return special.save(null,
      {
        success: (special) => {
          return dispatch( (() => {
            return {
              type: UPDATE_SPECIAL,
              special: special
            };
          })())
        },
      }
    );

  }
}

export function deleteSpecial(special) {
  return dispatch => {
    return special.destroy(
      {
        success: (special) => {
          return dispatch( (() => {
            return {
              type: DELETE_SPECIAL,
              special: special
            };
          })())
        },
      }
    );

  }
}
