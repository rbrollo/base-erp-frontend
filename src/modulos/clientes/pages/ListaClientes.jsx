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
  FloatingLabel
} from "react-bootstrap";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import BaseAPI from "../../../api/BaseAPI";
import ModalCadastrarCliente from "../components/ModalCadastrarCliente";
import ModalEditarCliente from "../components/ModalEditarCliente";


function ListaClientes() {
  const [clientes, setClientes] = useState([{}]);
  const [carregando, setCarregando] = useState(true);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      query: "",
    },
  });

  const getClientes = (values) => {
    setCarregando(true);
    BaseAPI.get("/clientes/lista_clientes/", {
      params: {
        nome: values ? values.query : null,
      },
    })
      .then((response) => {
        const { data } = response;
        setClientes(data.results);
        setCarregando(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Cadastro de clientes</Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit(getClientes)}>
        <Row className="my-4">
          <Col sm>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome do cliente"
              className="mb-3"
            >
              <Form.Control type="text" {...register("query")} />
            </FloatingLabel>
          </Col>
          <Col sm className="mt-2">
            <Button className="mx-1">
              <PersonSearchIcon onClick={handleSubmit(getClientes)} />
            </Button>
            <ModalCadastrarCliente getClientes={getClientes} />
          </Col>
        </Row>
      </form>

      <Table striped responsive bordered>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carregando && <Spinner animation="border" variant="primary" />}
          {!carregando &&
            clientes.length > 0 &&
            clientes.map((cliente) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <ModalEditarCliente
                      idCliente={cliente.id_cliente}
                      getClientes={() => getClientes()}
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

export { ListaClientes };
export default ListaClientes;
