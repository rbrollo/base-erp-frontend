import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Breadcrumb,
  Button,
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Form,
  FloatingLabel,
} from "react-bootstrap";

import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import BaseAPI from "../../../api/BaseAPI";
import ModalCadastrarServico from "../components/ModalCadastrarServico";
import ModalEditarServico from "../components/ModalEditarServico";

function ListaServicos() {
  const [servicos, setServicos] = useState([{}]);
  const [carregando, setCarregando] = useState(true);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const getServicos = (values) => {
    setCarregando(true);
    BaseAPI.get("/servicos/lista_servicos/", {
      params: {
        nome_servico: values ? values.query : null,
      },
    })
      .then((response) => {
        const { data } = response;
        setServicos(data.results);
        setCarregando(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getServicos();
  }, []);

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Cadastro de serviços</Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit(getServicos)}>
        <Row className="my-4">
          <Col sm>
            <FloatingLabel
              controlId="floatingInput"
              label="Serviço"
              className="mb-3"
            >
              <Form.Control type="text" {...register("query")} />
            </FloatingLabel>
          </Col>
          <Col sm className="mt-2">
            <Button className="mx-1">
              <ManageSearchIcon onClick={handleSubmit(getServicos)} />
            </Button>
            <ModalCadastrarServico getServicos={getServicos} />
          </Col>
        </Row>
      </form>

      <Table striped responsive bordered>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carregando && <Spinner animation="border" variant="primary" />}
          {!carregando &&
            servicos.length > 0 &&
            servicos.map((servico) => {
              return (
                <tr key={servico.id_servico}>
                  <td>{servico.nome_servico}</td>
                  <td>{servico.descricao_servico}</td>
                  <td>R${servico.valor_servico}</td>
                  <td>
                    <ModalEditarServico
                      idServico={servico.id_servico}
                      getServicos={() => getServicos()}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export { ListaServicos };
export default ListaServicos;
