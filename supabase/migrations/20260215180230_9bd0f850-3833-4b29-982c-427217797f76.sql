
-- Create project_boards table
CREATE TABLE public.project_boards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  deadline date,
  status text NOT NULL DEFAULT 'active',
  created_by text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage project_boards" ON public.project_boards
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_project_boards_updated_at
  BEFORE UPDATE ON public.project_boards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create project_tasks table
CREATE TABLE public.project_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id uuid NOT NULL REFERENCES public.project_boards(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pendiente',
  priority text NOT NULL DEFAULT 'media',
  assignee text,
  due_date date,
  sort_order integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage project_tasks" ON public.project_tasks
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_project_tasks_updated_at
  BEFORE UPDATE ON public.project_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_project_tasks_board_id ON public.project_tasks(board_id);
CREATE INDEX idx_project_tasks_status ON public.project_tasks(status);
CREATE INDEX idx_project_tasks_sort_order ON public.project_tasks(sort_order);
