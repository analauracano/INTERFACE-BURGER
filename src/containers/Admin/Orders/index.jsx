import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Row } from './row';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { FilterOption, Filter } from './styles';
import { orderStatusOptions } from './orderStatus';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);

  const [rows, setRows] = useState([]);

  // carregar pedidos
  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('/orders');
      setOrders(data);
      setFilteredOrders(data);
    }
    loadOrders();
  }, []);

  // criar dados formatados para tabela
  function createData(order) {
    return {
      name: order.user?.name ?? "N/A",
      orderId: order._id,
      date: order.createdAt,
      status: order.status ?? "",
      products: order.products ?? [],
    };
  }

  useEffect(() => {
    const newRows = filteredOrders.map((order) => createData(order));
    setRows(newRows);
  }, [filteredOrders]);

  // quando usuário clica no filtro em cima
  function handleStatus(status) {
    setActiveStatus(status.id);

    if (status.id === 0) {
      setFilteredOrders(orders);
      return;
    }

    const newOrders = orders.filter(
      order => order.status === status.value
    );

    setFilteredOrders(newOrders);
  }

  // quando "orders" muda (ex: após atualizar status)
  useEffect(() => {
    if (activeStatus === 0) {
      setFilteredOrders(orders);
      return;
    }

    const selected = orderStatusOptions.find(item => item.id === activeStatus);

    if (!selected) {
      setFilteredOrders(orders);
      return;
    }

    const newFilteredOrders = orders.filter(
      order => order.status === selected.value
    );

    setFilteredOrders(newFilteredOrders);
  }, [orders, activeStatus]);

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActive={activeStatus === status.id}
          >
            {status.label}
          </FilterOption>
        ))}
      </Filter>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ backgroundColor: "#363636" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Pedido</TableCell>
              <TableCell sx={{ color: "white" }}>Cliente</TableCell>
              <TableCell sx={{ color: "white" }}>Data</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Detalhes
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
