import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './styles';

export function BackButton({ to = '/' }) {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(to)}>
      ←
    </Button>
  );
}
