const connection = require("../database");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [amountIncidents] = await connection('incidents').count();

    const ongs = await connection("incidents")
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset(( page - 1 ) * 5 )
      .select([
        "incidents.*", 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);

    response.header('X-Total-Count', amountIncidents['count(*)']);

    return response.json(ongs);
  },

  async store(request, response) {
    const { title, description, value } = request.body;

    const ong_id = request.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { incidentId } = request.params;
    const ong_id = request.headers.authorization;

    const incident =  await connection('incidents')
      .where('id', incidentId)
      .select('ong_id')
      .first();

    if(incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permited.' });
    }

    await connection("incidents")
      .where('id', incidentId)
      .delete();

    return response.status(204).send();
  }
};
