const ContactRoot = {
    getContacts: ({ csv }) => {
      const arr = csv.split('\n');
      const cols = arr.shift().split(',');
      const rows = arr.map(ln => ln.split(','));
      const index = {
        email: cols.indexOf('email'),
        phone: cols.indexOf('phone'),
        name: cols.indexOf('name'),
        language: cols.indexOf('language'),
        gender: cols.indexOf('gender'),
        country: cols.indexOf('country'),
      };
      return rows.map((r) =>  {
        return {
          email: r[index.email],
          phone: r[index.phone],
          name: r[index.name],
          language: r[index.name],
          gender: r[index.gender],
          country: r[index.country]
        };
      });
    },
    emailContacts: ({ contacts }) => {
      console.log('email contacts');
    }
  };

  module.exports = ContactRoot;