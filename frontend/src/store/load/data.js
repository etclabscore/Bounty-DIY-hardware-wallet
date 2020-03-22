
export default Base =>
  class extends Base {
    async loadData() {
      try {
        console.log('loaded store');
      } catch (error) {
        console.log(error);
      }
    }
  };
