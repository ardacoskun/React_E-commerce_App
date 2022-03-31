import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseService } from "../network/services/baseService";
import styled from "styled-components";
import Navbar from "./Navbar";

import Footer from "./Footer";
import { ArrowLeftOutlined } from "@material-ui/icons";

const SupplierDetailPage = () => {
  const [supplier, setSupplier] = useState({});
  // const params = useParams()
  const { id } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  const { state } = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await baseService.get("/suppliers/" + id);

    const arda = state?.data?.details.map((item) => {
      console.log("item", item.productId);
    });

    setSupplier(data);
  };

  return (
    <div>
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        style={{ border: "none", padding: "10px", cursor: "pointer" }}
      >
        <ArrowLeftOutlined />
      </button>
      <Wrapper>
        <h1>Detail Page:</h1>
        <Table>
          <Tr>
            <Th>Product ID</Th>
            <Th>Unit Price</Th>
            <Th>Order Quantity</Th>
            <Th>Order Total</Th>
          </Tr>
          {state?.data?.details.map((item) => {
            return (
              <Tr>
                <Td>{item.productId}</Td>
                <Td> ${item.unitPrice}</Td>
                <Td>{item.quantity}</Td>
                <Td>
                  {" "}
                  Total: $
                  {Number(
                    state?.data?.details[0].unitPrice *
                      state?.data?.details[0].quantity
                  )}
                </Td>
              </Tr>
            );
          })}
        </Table>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Th = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

export default SupplierDetailPage;
