const Motoboy = require("../models/Motoboy");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

function passwordValidation(password) {
  if (password.length < 8) return "Senha deve ter no mínimo 8 caracteres.";
  else if (!password.match(/[a-zA-Z]/g))
    return "Senha deve ter no mínimo uma letra.";
  else if (!password.match(/[0-9]+/))
    return "Senha deve ter no mínimo um número.";
  else return "OK";
}

module.exports = {
  async newMotoboy(req, res) {
    const { name, cpf, phone, password, associateId } = req.body;
    if (!name || !cpf || !phone || !password || !associateId) {
      res.status(400).json({
        msg: "Dados obrigatórios não foram preenchidos.",
      });
    }

    const passwordValid = passwordValidation(password);
    if (passwordValid !== "OK")
      return res.status(400).json({
        msg: passwordValid,
      });
    //Procurar no BD por medico já existente
    const isMotoboyNew = await Motoboy.findOne({
      where: {
        cpf,
      },
    });

    if (isMotoboyNew)
      res.status(403).json({
        msg: "CPF já foi cadastrado.",
      });
    else {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(password, salt);
      const motoboy = await Motoboy.create({
        associateId,
        name,
        cpf,
        phone,
        password: hash,
      }).catch((error) => {
        res.status(500).json({
          msg: "Não foi possível inserir os dados.",
        });
      });
      if (motoboy)
        res.status(201).json({
          msg: "Novo motoboy foi adicionado.",
        });
      else
        res.status(404).json({
          msg: "Não foi possível cadastrar novo motoboy.",
        });
    }
  },

  async listAllMotoboys(req, res) {
    const motoboys = await Motoboy.findAll({
      motoboys: [["id", "ASC"]],
    }).catch((error) => {
      res.status(500).json({
        msg: "Falha na conexão.",
      });
    });
    if (motoboys)
      if (motoboys == "")
        res.status(404).json({
          msg: "Não foi possível encontrar motoboys.",
        });
      else
        res.status(200).json({
          motoboys,
        });
    else
      res.status(404).json({
        msg: "Não foi possível encontrar motoboys.",
      });
  },

  async deleteMotoboy(req, res) {
    const id = req.params.id;
    const deletedMotoboy = await Motoboy.destroy({
      where: {
        id: id,
      },
    }).catch(async (error) => {
      return res.status(403).json({
        msg: "Falha ao excluir motoboy",
      });
    });
    if (deletedMotoboy != 0)
      res.status(200).json({
        msg: "Motoboy excluido com sucesso.",
      });
    else
      res.status(404).json({
        msg: "Motoboy não encontrado.",
      });
  },

  async searchMotoboyByCpf(req, res) {
    const cpf = req.body.cpf;
    if (!cpf)
      res.status(400).json({
        msg: "Parâmetro nome está vazio.",
      });
    const Op = Sequelize.Op;
    const motoboy = await Motoboy.findAll({
      where: {
        cpf: {
          [Op.like]: "%" + cpf + "%",
        },
      },
    });
    if (motoboy) {
      if (motoboy == "")
        res.status(404).json({
          msg: "Motoboy com cpf " + cpf + " não encontrado",
        });
      else
        res.status(200).json({
          motoboy,
        });
    } else
      res.status(404).json({
        msg: "Motoboy não encontrado.",
      });
  },

  async updateMotoboy(req, res) {
    const MotoboyId = req.body.id;
    const motoboy = req.body;
    if (!MotoboyId)
      res.status(400).json({
        msg: "ID do Motoboy vazio.",
      });
    else {
      const MotoboyExists = await Motoboy.findByPk(MotoboyId);
      if (!MotoboyExists)
        res.status(404).json({
          msg: "Motoboy não encontrado.",
        });
      else {
        if (motoboy.name || motoboy.address) {
          await Motoboy.update(motoboy, {
            where: {
              id: MotoboyId,
            },
          });
          return res.status(200).json({
            msg: "Motoboy atualizado com sucesso.",
          });
        } else
          return res.status(400).json({
            msg: "Campos obrigatórios não preenchidos.",
          });
      }
    }
  },
};
