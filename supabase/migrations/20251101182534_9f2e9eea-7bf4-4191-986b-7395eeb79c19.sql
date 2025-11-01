-- Eliminar perfiles de ejemplo de team_members
DELETE FROM team_members 
WHERE id IN (
  '042a029f-7b0b-4753-9e85-6999bc5e8d39',
  'c3ecee7f-282f-4a51-bdba-be1f4fd3b056'
);