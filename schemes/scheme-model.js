function find() {
    return db('steps');
  }
  function findById(id) {
      return db('schemes').where({id: id}).first()
  }
  
  function findSteps(id){
  
      return db('steps')
      .where({scheme_id: id})
      .select('step_number', 'instructions','scheme_id', 'id')
  }
  async function add(scheme) {
      const [ insertedSchemeId ] = await db('schemes').insert(scheme);
      return findById(insertedSchemeId);
  }
  
  async function addStep (stepData, id){
      const stepPayload = {
          scheme_id: id,
          step_number: stepData.step_number,
          instructions: stepData.instructions
      }
      db('steps').insert(stepPayload);
      return findSteps(id)
  }
  function update (changes, id){
    db('schemes').update(changes).where({id, id})
    return findSteps(id)
  }
  function remove(id) {
      return db('schemes').del().where({id: id})
  }
  module.exports = {
      find,
      findById,
      findSteps,
      add,
      addStep,
      update,
      remove
  }