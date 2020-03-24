const connection = require('../database');

module.exports = {
  async store(request, response) {
    const { id } = request.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();
    
    if(!ong) {
      return response.status(400).json({ error: 'Ong not found' });
    }

    return response.json(ong);
  }
}