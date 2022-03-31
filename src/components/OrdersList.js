import { useEffect, useState } from "react";
import { baseService } from "../network/services/baseService";
import { useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "./Navbar";

import styled from "styled-components";
import Loading from "./Loading";
import { useAppContext } from "../context/AppContext";

const CategoryList = () => {
  const [orders, setOrders] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, setLoading } = useAppContext();

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = () => {
    baseService
      .get("/orders")
      .then((data) => {
        setOrders(data.reverse());
        setRefresh((prev) => !prev);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Get Category error", err);
        setLoading(false);
      });
  };

  const goToDetail = (id) => {
    // const data = suppliers.filter(q => q.id === id)[0]
    const data = orders.filter((q) => q.id === id)[0];

    navigate(`/orders/${id}`, { state: { data: data } });
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Table>
          <Tr>
            <Th>ID</Th>
            <Th>Customer ID</Th>
            <Th>Order Date</Th>
            <Th>Detail</Th>
          </Tr>
          {orders.map((item) => {
            return (
              <Tr>
                <Td>{item.id}</Td>
                <Td> ${item.customerId}</Td>
                <Td>{item.orderDate}</Td>
                <Td>
                  <Button onClick={() => goToDetail(item.id)}>
                    Order Detail
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Table>
      )}
    </>
  );
};

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

const Tr = styled.tr``;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #ff3d5f;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #e23251;
  }
`;

export default CategoryList;
