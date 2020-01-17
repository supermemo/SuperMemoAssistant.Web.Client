export default {
  handleHydraError: function(err, fieldSetterMap, globalErrSetter)
  {
    var remainingErrors = this.mapHydraErrorFields(err, fieldSetterMap);
    
    if (remainingErrors !== null) {
      globalErrSetter(this.mapViolations(remainingErrors));
      return;
    }

    globalErrSetter(this.getHydraErrorText(err));
  },
  mapHydraErrorFields: function(err, fieldSetterMap) {
    if (typeof(err.response) === null || err.response === null)
      return null;
      
    var resp = err.response;
    var data = resp.data;

    /*if (resp.status === 500)
      throw new Error(err);*/

    if (data['violations']) {
      var remainingErrors = [];

      for (var i = 0; i < data['violations'].length; i++)
      {
        var violation = data['violations'][i];
        var prop = violation.propertyPath;
        var msg = violation.message;

        if (fieldSetterMap[prop] != undefined)
          fieldSetterMap[prop](msg);

        else
          remainingErrors.push(violation);
      }

      return remainingErrors;
    }

    return null;
  },
  getHydraErrorText: function(err) {
    if (typeof(err.response) === null || err.response === null)
      return err;
      
    var resp = err.response;
    var data = resp.data;

    /*if (resp.status === 500)
      throw new Error(err);*/

    if (data['violations'])
      return this.mapViolations(data['violations']);

    if (data["hydra:description"])
      return data["hydra:description"];

    return err;
  },
  mapViolations: function(violations) {
    var errors = violations.map(violation => `<li><p class="text-danger">${violation.propertyPath}: ${violation.message}</p></li>`).join('\n');

    return errors.length == 0 ? '' : `<ul>${errors}</ul>`;
  }
};
