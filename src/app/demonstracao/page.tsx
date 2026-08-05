"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  BarChart3,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings,
  Eye,
  Edit,
  Stethoscope,
  Activity,
  DollarSign,
  UserPlus,
  CalendarPlus,
  Package,
  ShoppingCart,
  Send,
  Trash2,
  X,
  Check,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  Save,
  Video,
  FileCheck,
  Menu,
  Download,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModuleId =
  | "dashboard"
  | "agenda"
  | "clientes"
  | "financeiro"
  | "relatorios"
  | "whatsapp"
  | "estoque"
  | "prontuario"
  | "pdv"
  | "odontograma"
  | "lembretes"
  | "plano-tratamento"
  | "teleconsulta"
  | "documentos"
  | "orcamentos"
  | "usuarios"
  | "exames"
  | "permissoes";

type SegmentId =
  | "clinica-medica"
  | "clinica-odontologica"
  | "salao"
  | "restaurante"
  | "personalizado"
  | "academia"
  | "pet"
  | "hotel"
  | "escola"
  | "contabil"
  | "advocacia"
  | "imobiliaria"
  | "consultoria"
  | "marketing"
  | "engenharia"
  | "farmacia"
  | "otica"
  | "veterinaria";

interface SegmentConfig {
  id: SegmentId;
  name: string;
  modules: ModuleId[];
  businessName: string;
  businessType: string;
  available: boolean;
}

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  cpf: string;
  lastVisit: string;
  totalSpent: number;
  status: "ativo" | "inativo";
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  patientId: number;
  patientName: string;
  professional: string;
  service: string;
  amount: number;
  status: "agendado" | "confirmado" | "cancelado" | "realizado" | "faltou";
  notes: string;
}

interface ProntuarioEntry {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  professional: string;
  type: "consulta" | "retorno" | "exame" | "emergencia";
  notes: string;
  prescription: string;
  cid: string;
}

interface ToothRecord {
  toothId: number;
  condition:
    | "saudavel"
    | "caries"
    | "restaurado"
    | "ausente"
    | "implante"
    | "coroa"
    | "endodontia"
    | "fratura"
    | "sellador"
    | "protese"
    | "inclinado"
    | "mancha"
    | "gengiva"
    | "extracao"
    | "tratamento";
  faces: {
    vestbular: boolean;
    lingual: boolean;
    mesial: boolean;
    distal: boolean;
    oclusal: boolean;
  };
  date: string;
  professional: string;
  notes: string;
}

interface TreatmentItem {
  id: number;
  toothId: number;
  procedure: string;
  status: "pendente" | "aprovado" | "em_execucao" | "concluido";
  value: number;
  sessions: number;
  completedSessions: number;
  notes: string;
}

interface Lembrete {
  id: number;
  patientId: number;
  patientName: string;
  type: string;
  date: string;
  time: string;
  message: string;
  status: "pendente" | "enviado" | "confirmado";
  channel: "whatsapp" | "sms" | "email";
}

interface WhatsAppMessage {
  id: number;
  patientName: string;
  message: string;
  time: string;
  status: "lido" | "pendente" | "respondido";
  direction: "enviado" | "recebido";
  appointmentId?: number;
  action?: "confirmar" | "cancelar" | "nenhum";
  actionTaken?: boolean;
}

interface Orcamento {
  id: number;
  patientId: number;
  patientName: string;
  procedures: string[];
  totalValue: number;
  validUntil: string;
  status: "pendente" | "aprovado" | "rejeitado" | "expirado";
  notes: string;
  createdAt: string;
}

interface Usuario {
  id: number;
  name: string;
  email: string;
  role: "dentista" | "medico" | "secretaria" | "admin";
  status: "ativo" | "inativo";
  lastAccess: string;
}

interface Exame {
  id: number;
  patientId: number;
  patientName: string;
  examType: string;
  requestDate: string;
  resultDate: string | null;
  status: "solicitado" | "em_andamento" | "realizado" | "pendente";
  resultNotes: string;
  hasFile: boolean;
}

interface Permissao {
  id: number;
  nome: string;
  email: string;
  cargo: "admin" | "dentista" | "secretaria";
  permissoes: string[];
  ativo: boolean;
}

// ---------------------------------------------------------------------------
// Segment Configs
// ---------------------------------------------------------------------------

const segmentConfigs: SegmentConfig[] = [
  {
    id: "clinica-medica",
    name: "Clinica Medica",
    modules: [
      "dashboard",
      "agenda",
      "clientes",
      "relatorios",
      "whatsapp",
      "prontuario",
      "lembretes",
      "orcamentos",
      "usuarios",
      "exames",
      "permissoes",
    ],
    businessName: "Clinica Saude+",
    businessType: "Clinica Medica",
    available: true,
  },
  {
    id: "clinica-odontologica",
    name: "Clinica Odontologica",
    modules: [
      "dashboard",
      "agenda",
      "financeiro",
      "relatorios",
      "odontograma",
      "lembretes",
      "prontuario",
      "plano-tratamento",
      "whatsapp",
      "orcamentos",
      "usuarios",
      "exames",
      "permissoes",
    ],
    businessName: "Odonto Vida",
    businessType: "Clinica Odontologica",
    available: true,
  },
  {
    id: "salao",
    name: "Salao",
    modules: ["dashboard", "agenda"],
    businessName: "Studio",
    businessType: "Salao",
    available: false,
  },
  {
    id: "restaurante",
    name: "Restaurante",
    modules: ["dashboard"],
    businessName: "Sabor",
    businessType: "Restaurante",
    available: false,
  },
  {
    id: "academia",
    name: "Academia",
    modules: ["dashboard"],
    businessName: "Fitness",
    businessType: "Academia",
    available: false,
  },
  {
    id: "pet",
    name: "Pet Shop",
    modules: ["dashboard"],
    businessName: "Pet Love",
    businessType: "Pet",
    available: false,
  },
  {
    id: "hotel",
    name: "Hotel",
    modules: ["dashboard"],
    businessName: "Hotel",
    businessType: "Hotel",
    available: false,
  },
  {
    id: "escola",
    name: "Escola",
    modules: ["dashboard"],
    businessName: "Educacao",
    businessType: "Escola",
    available: false,
  },
  {
    id: "contabil",
    name: "Contabil",
    modules: ["dashboard"],
    businessName: "Contabil",
    businessType: "Contabil",
    available: false,
  },
  {
    id: "advocacia",
    name: "Advocacia",
    modules: ["dashboard"],
    businessName: "Advocacia",
    businessType: "Advocacia",
    available: false,
  },
  {
    id: "imobiliaria",
    name: "Imobiliaria",
    modules: ["dashboard"],
    businessName: "Imovel",
    businessType: "Imobiliaria",
    available: false,
  },
  {
    id: "consultoria",
    name: "Consultoria",
    modules: ["dashboard"],
    businessName: "Consultoria",
    businessType: "Consultoria",
    available: false,
  },
  {
    id: "marketing",
    name: "Marketing",
    modules: ["dashboard"],
    businessName: "Marketing",
    businessType: "Marketing",
    available: false,
  },
  {
    id: "engenharia",
    name: "Engenharia",
    modules: ["dashboard"],
    businessName: "Engenharia",
    businessType: "Engenharia",
    available: false,
  },
  {
    id: "farmacia",
    name: "Farmacia",
    modules: ["dashboard"],
    businessName: "Farmacia",
    businessType: "Farmacia",
    available: false,
  },
  {
    id: "otica",
    name: "Otica",
    modules: ["dashboard"],
    businessName: "Otica",
    businessType: "Otica",
    available: false,
  },
  {
    id: "veterinaria",
    name: "Veterinaria",
    modules: ["dashboard"],
    businessName: "Vet",
    businessType: "Veterinaria",
    available: false,
  },
  {
    id: "personalizado",
    name: "Personalizado",
    modules: ["dashboard"],
    businessName: "Negocio",
    businessType: "Personalizado",
    available: false,
  },
];

// ---------------------------------------------------------------------------
// Initial Data
// ---------------------------------------------------------------------------

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    phone: "(21) 99876-5432",
    email: "maria@email.com",
    birthDate: "1985-03-15",
    cpf: "123.456.789-00",
    lastVisit: "2026-08-01",
    totalSpent: 1250,
    status: "ativo",
  },
  {
    id: 2,
    name: "Joao Santos",
    phone: "(21) 99765-4321",
    email: "joao@email.com",
    birthDate: "1990-07-22",
    cpf: "987.654.321-00",
    lastVisit: "2026-08-03",
    totalSpent: 890,
    status: "ativo",
  },
  {
    id: 3,
    name: "Ana Costa",
    phone: "(21) 99654-3210",
    email: "ana@email.com",
    birthDate: "1978-11-08",
    cpf: "456.789.123-00",
    lastVisit: "2026-07-28",
    totalSpent: 2100,
    status: "ativo",
  },
  {
    id: 4,
    name: "Pedro Lima",
    phone: "(21) 99543-2109",
    email: "pedro@email.com",
    birthDate: "1995-01-30",
    cpf: "321.654.987-00",
    lastVisit: "2026-08-02",
    totalSpent: 450,
    status: "ativo",
  },
  {
    id: 5,
    name: "Lucia Ferreira",
    phone: "(21) 99432-1098",
    email: "lucia@email.com",
    birthDate: "1982-06-12",
    cpf: "789.123.456-00",
    lastVisit: "2026-07-15",
    totalSpent: 780,
    status: "inativo",
  },
  {
    id: 6,
    name: "Carlos Mendes",
    phone: "(21) 99321-0987",
    email: "carlos@email.com",
    birthDate: "1970-09-05",
    cpf: "654.321.987-00",
    lastVisit: "2026-08-04",
    totalSpent: 3200,
    status: "ativo",
  },
  {
    id: 7,
    name: "Fernanda Alves",
    phone: "(21) 99210-9876",
    email: "fernanda@email.com",
    birthDate: "1998-12-20",
    cpf: "147.258.369-00",
    lastVisit: "2026-08-01",
    totalSpent: 950,
    status: "ativo",
  },
  {
    id: 8,
    name: "Roberto Souza",
    phone: "(21) 99109-8765",
    email: "roberto@email.com",
    birthDate: "1965-08-18",
    cpf: "369.258.147-00",
    lastVisit: "2026-07-20",
    totalSpent: 1500,
    status: "ativo",
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 1,
    date: "2026-08-05",
    time: "09:00",
    patientId: 1,
    patientName: "Maria Silva",
    professional: "Dr. Ricardo",
    service: "Consulta",
    amount: 250,
    status: "confirmado",
    notes: "Retorno para controle",
  },
  {
    id: 2,
    date: "2026-08-05",
    time: "10:30",
    patientId: 2,
    patientName: "Joao Santos",
    professional: "Dr. Ricardo",
    service: "Limpeza",
    amount: 150,
    status: "agendado",
    notes: "",
  },
  {
    id: 3,
    date: "2026-08-05",
    time: "11:00",
    patientId: 3,
    patientName: "Ana Costa",
    professional: "Dra. Beatriz",
    service: "Exame",
    amount: 450,
    status: "agendado",
    notes: "",
  },
  {
    id: 4,
    date: "2026-08-05",
    time: "14:00",
    patientId: 4,
    patientName: "Pedro Lima",
    professional: "Dr. Ricardo",
    service: "Consulta",
    amount: 250,
    status: "realizado",
    notes: "Paciente OK",
  },
  {
    id: 5,
    date: "2026-08-05",
    time: "15:30",
    patientId: 6,
    patientName: "Carlos Mendes",
    professional: "Dra. Beatriz",
    service: "Retorno",
    amount: 0,
    status: "faltou",
    notes: "",
  },
  {
    id: 6,
    date: "2026-08-06",
    time: "09:00",
    patientId: 7,
    patientName: "Fernanda Alves",
    professional: "Dr. Ricardo",
    service: "Consulta",
    amount: 250,
    status: "agendado",
    notes: "",
  },
  {
    id: 7,
    date: "2026-08-06",
    time: "10:00",
    patientId: 8,
    patientName: "Roberto Souza",
    professional: "Dr. Ricardo",
    service: "Consulta",
    amount: 250,
    status: "agendado",
    notes: "",
  },
  {
    id: 8,
    date: "2026-08-04",
    time: "14:00",
    patientId: 3,
    patientName: "Ana Costa",
    professional: "Dra. Beatriz",
    service: "Retorno",
    amount: 0,
    status: "faltou",
    notes: "",
  },
  {
    id: 9,
    date: "2026-08-03",
    time: "11:00",
    patientId: 5,
    patientName: "Lucia Ferreira",
    professional: "Dr. Ricardo",
    service: "Consulta",
    amount: 250,
    status: "cancelado",
    notes: "Paciente solicitou cancelamento",
  },
  {
    id: 10,
    date: "2026-08-02",
    time: "09:30",
    patientId: 8,
    patientName: "Roberto Souza",
    professional: "Dr. Ricardo",
    service: "Limpeza",
    amount: 150,
    status: "cancelado",
    notes: "Reagendado",
  },
  {
    id: 11,
    date: "2026-08-07",
    time: "10:00",
    patientId: 1,
    patientName: "Maria Silva",
    professional: "Dr. Ricardo",
    service: "Retorno",
    amount: 0,
    status: "agendado",
    notes: "Retorno para acompanhamento",
  },
  {
    id: 12,
    date: "2026-08-08",
    time: "14:30",
    patientId: 6,
    patientName: "Carlos Mendes",
    professional: "Dra. Beatriz",
    service: "Retorno",
    amount: 0,
    status: "confirmado",
    notes: "Retorno periodontal",
  },
];

const initialProntuarios: ProntuarioEntry[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Silva",
    date: "2026-08-05",
    professional: "Dr. Ricardo",
    type: "retorno",
    notes: "Paciente relata melhora nos sintomas. Manter tratamento.",
    prescription: "Ibuprofeno 600mg - 8/8h por 7 dias",
    cid: "M54.5",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Joao Santos",
    date: "2026-08-04",
    professional: "Dr. Ricardo",
    type: "consulta",
    notes: "Exames dentro da normalidade. Pressão arterial controlada.",
    prescription: "Losartana 50mg - 1x ao dia",
    cid: "I10",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Ana Costa",
    date: "2026-08-03",
    professional: "Dra. Beatriz",
    type: "exame",
    notes: "Raio-X do tórax sem alterações.",
    prescription: "",
    cid: "Z01.1",
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Pedro Lima",
    date: "2026-08-02",
    professional: "Dr. Ricardo",
    type: "consulta",
    notes: "Dor lombar baixa. Indicar fisioterapia.",
    prescription: "Dipirona 500mg - 6/6h | Encaminhar fisioterapia",
    cid: "M54.4",
  },
];

const initialToothRecords: ToothRecord[] = [
  {
    toothId: 12,
    condition: "restaurado",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: true,
      distal: false,
      oclusal: false,
    },
    date: "2026-06-10",
    professional: "Dr. Ricardo",
    notes: "Restauração em amalgama",
  },
  {
    toothId: 15,
    condition: "caries",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: true,
      distal: false,
      oclusal: true,
    },
    date: "2026-08-01",
    professional: "Dr. Ricardo",
    notes: "Cáries profunda",
  },
  {
    toothId: 16,
    condition: "endodontia",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: true,
    },
    date: "2026-05-20",
    professional: "Dr. Ricardo",
    notes: "Tratamento endodontico concluido",
  },
  {
    toothId: 18,
    condition: "ausente",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: false,
    },
    date: "2025-12-15",
    professional: "Dr. Ricardo",
    notes: "Extração realizada",
  },
  {
    toothId: 24,
    condition: "caries",
    faces: {
      vestbular: true,
      lingual: false,
      mesial: true,
      distal: false,
      oclusal: false,
    },
    date: "2026-08-01",
    professional: "Dr. Ricardo",
    notes: "Caries vestibulo-mesial",
  },
  {
    toothId: 27,
    condition: "coroa",
    faces: {
      vestbular: true,
      lingual: true,
      mesial: true,
      distal: true,
      oclusal: true,
    },
    date: "2026-03-15",
    professional: "Dr. Ricardo",
    notes: "Coroa ceramica instalada",
  },
  {
    toothId: 28,
    condition: "ausente",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: false,
    },
    date: "2025-10-20",
    professional: "Dr. Ricardo",
    notes: "Extração",
  },
  {
    toothId: 35,
    condition: "restaurado",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: true,
    },
    date: "2026-07-05",
    professional: "Dr. Ricardo",
    notes: "Restauração resina",
  },
  {
    toothId: 45,
    condition: "caries",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: true,
      oclusal: true,
    },
    date: "2026-08-01",
    professional: "Dr. Ricardo",
    notes: "Caries disto-oclusal",
  },
  {
    toothId: 47,
    condition: "restaurado",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: true,
      distal: false,
      oclusal: true,
    },
    date: "2026-04-10",
    professional: "Dr. Ricardo",
    notes: "Restauração ampla",
  },
  {
    toothId: 48,
    condition: "ausente",
    faces: {
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: false,
    },
    date: "2025-11-05",
    professional: "Dr. Ricardo",
    notes: "Extração de sisos",
  },
];

const initialTreatmentPlan: TreatmentItem[] = [
  {
    id: 1,
    toothId: 15,
    procedure: "Tratamento de cáries - Restauração em resina",
    status: "aprovado",
    value: 280,
    sessions: 1,
    completedSessions: 0,
    notes: "Cáries profunda - pode necessitar endodontia",
  },
  {
    id: 2,
    toothId: 24,
    procedure: "Restauração vestibulo-mesial em resina",
    status: "pendente",
    value: 220,
    sessions: 1,
    completedSessions: 0,
    notes: "",
  },
  {
    id: 3,
    toothId: 45,
    procedure: "Tratamento de cáries - Restauração",
    status: "em_execucao",
    value: 250,
    sessions: 2,
    completedSessions: 1,
    notes: "1a sessao concluida",
  },
  {
    id: 4,
    toothId: 16,
    procedure: "Coroa sobre endodontia",
    status: "pendente",
    value: 890,
    sessions: 2,
    completedSessions: 0,
    notes: "Após conclusão da endodontia",
  },
];

const initialLembretes: Lembrete[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Silva",
    type: "retorno",
    date: "2026-08-15",
    time: "09:00",
    message: "Retorno para controle",
    status: "pendente",
    channel: "whatsapp",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Joao Santos",
    type: "limpeza",
    date: "2026-08-10",
    time: "14:30",
    message: "Lembrete de limpeza semestral",
    status: "enviado",
    channel: "sms",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Ana Costa",
    type: "exame",
    date: "2026-08-08",
    time: "11:00",
    message: "Resultado de exame disponível",
    status: "confirmado",
    channel: "whatsapp",
  },
  {
    id: 4,
    patientId: 7,
    patientName: "Fernanda Alves",
    type: "aniversario",
    date: "2026-08-20",
    time: "08:00",
    message: "Feliz aniversario! Descconto de 10%",
    status: "pendente",
    channel: "whatsapp",
  },
];

const initialWhatsAppMessages: WhatsAppMessage[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    message: "Consulta confirmada para 05/08 as 09:00. Obrigada!",
    time: "09:15",
    status: "lido",
    direction: "recebido",
    appointmentId: 1,
  },
  {
    id: 2,
    patientName: "Joao Santos",
    message: "Bom dia! Pode confirmar meu horario de amanha?",
    time: "08:30",
    status: "lido",
    direction: "recebido",
    appointmentId: 2,
  },
  {
    id: 3,
    patientName: "Ana Costa",
    message: "Preciso remarcar minha consulta para outra data.",
    time: "14:20",
    status: "pendente",
    direction: "recebido",
    appointmentId: 3,
  },
  {
    id: 4,
    patientName: "Pedro Lima",
    message:
      "Seu agendamento para 05/08 as 14:00 esta confirmado. Confirmar ouCancelar?",
    time: "10:00",
    status: "lido",
    direction: "enviado",
    appointmentId: 4,
    action: "confirmar",
    actionTaken: true,
  },
  {
    id: 5,
    patientName: "Roberto Souza",
    message: "Lembrete: sua consulta e amanha as 15:30. Podemos confirmar?",
    time: "16:00",
    status: "respondido",
    direction: "enviado",
    appointmentId: 5,
    action: "confirmar",
    actionTaken: false,
  },
];

const initialOrcamentos: Orcamento[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Silva",
    procedures: ["Limpeza", "Restauracao"],
    totalValue: 420,
    validUntil: "2026-08-30",
    status: "pendente",
    notes: "Paciente solicitou orcamento para tratamento periodontal",
    createdAt: "2026-08-01",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Joao Santos",
    procedures: ["Clareamento"],
    totalValue: 800,
    validUntil: "2026-09-15",
    status: "pendente",
    notes: "Clareamento a laser - pacote completo",
    createdAt: "2026-08-03",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Ana Costa",
    procedures: ["Extraacao", "Consulta", "Raio-X"],
    totalValue: 250,
    validUntil: "2026-08-20",
    status: "aprovado",
    notes: "Extracao do siso incluso",
    createdAt: "2026-07-28",
  },
  {
    id: 4,
    patientId: 6,
    patientName: "Carlos Mendes",
    procedures: ["Limpeza", "Restauracao", "Clareamento", "Consulta"],
    totalValue: 2350,
    validUntil: "2026-08-01",
    status: "expirado",
    notes: "Tratamento completo - prazo expirado",
    createdAt: "2026-07-01",
  },
  {
    id: 5,
    patientId: 4,
    patientName: "Pedro Lima",
    procedures: ["Consulta", "Limpeza"],
    totalValue: 300,
    validUntil: "2026-09-10",
    status: "pendente",
    notes: "Retorno para avaliacao periodontal",
    createdAt: "2026-08-02",
  },
];

const initialUsuarios: Usuario[] = [
  {
    id: 1,
    name: "Dr. Ricardo Mendes",
    email: "ricardo@clinicasaude.com.br",
    role: "dentista",
    status: "ativo",
    lastAccess: "2026-08-05",
  },
  {
    id: 2,
    name: "Dra. Beatriz Lima",
    email: "beatriz@clinicasaude.com.br",
    role: "dentista",
    status: "ativo",
    lastAccess: "2026-08-04",
  },
  {
    id: 3,
    name: "Ana Souza",
    email: "ana@clinicasaude.com.br",
    role: "secretaria",
    status: "ativo",
    lastAccess: "2026-08-05",
  },
  {
    id: 4,
    name: "Carlos Pereira",
    email: "carlos@clinicasaude.com.br",
    role: "admin",
    status: "ativo",
    lastAccess: "2026-08-05",
  },
  {
    id: 5,
    name: "Dr. Fernando Alves",
    email: "fernando@clinicasaude.com.br",
    role: "medico",
    status: "inativo",
    lastAccess: "2026-07-15",
  },
];

const initialExames: Exame[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Maria Silva",
    examType: "Raio-X panoramica",
    requestDate: "2026-08-01",
    resultDate: "2026-08-03",
    status: "realizado",
    resultNotes: "Sem alteracoes significativas",
    hasFile: true,
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Joao Santos",
    examType: "Hemograma completo",
    requestDate: "2026-08-03",
    resultDate: null,
    status: "solicitado",
    resultNotes: "",
    hasFile: false,
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Ana Costa",
    examType: "Tomografia computadorizada",
    requestDate: "2026-07-28",
    resultDate: "2026-08-02",
    status: "realizado",
    resultNotes: "Avaliacao para implante dentario",
    hasFile: true,
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Pedro Lima",
    examType: "Panoramica dental",
    requestDate: "2026-08-04",
    resultDate: null,
    status: "em_andamento",
    resultNotes: "",
    hasFile: false,
  },
  {
    id: 5,
    patientId: 6,
    patientName: "Carlos Mendes",
    examType: "Exame de sangue",
    requestDate: "2026-07-20",
    resultDate: null,
    status: "pendente",
    resultNotes: "Aguardando coleta",
    hasFile: false,
  },
];

const initialPermissoes: Permissao[] = [
  {
    id: 1,
    nome: "Dr. Ricardo",
    email: "ricardo@clinica.com",
    cargo: "dentista",
    permissoes: ["agenda", "prontuario", "odontograma", "exames", "pacientes"],
    ativo: true,
  },
  {
    id: 2,
    nome: "Dra. Beatriz",
    email: "beatriz@clinica.com",
    cargo: "dentista",
    permissoes: ["agenda", "prontuario", "odontograma", "exames", "pacientes"],
    ativo: true,
  },
  {
    id: 3,
    nome: "Ana Souza",
    email: "ana@clinica.com",
    cargo: "secretaria",
    permissoes: ["agenda", "pacientes", "whatsapp", "orcamentos", "financeiro"],
    ativo: true,
  },
  {
    id: 4,
    nome: "Carlos Admin",
    email: "carlos@clinica.com",
    cargo: "admin",
    permissoes: ["*"],
    ativo: true,
  },
];

const weeklyData = [
  { day: "Seg", revenue: 3200, appointments: 12 },
  { day: "Ter", revenue: 4100, appointments: 15 },
  { day: "Qua", revenue: 3800, appointments: 14 },
  { day: "Qui", revenue: 4500, appointments: 16 },
  { day: "Sex", revenue: 5200, appointments: 18 },
  { day: "Sab", revenue: 2800, appointments: 10 },
  { day: "Dom", revenue: 0, appointments: 0 },
];

const conditionLabels: Record<string, string> = {
  saudavel: "Saudavel",
  caries: "Caries",
  restaurado: "Restaurado",
  ausente: "Ausente",
  implante: "Implante",
  coroa: "Coroa",
  endodontia: "Endodontia",
  fratura: "Fratura",
  sellador: "Sellador",
  protese: "Prótese",
  inclinado: "Inclinado",
  mancha: "Mancha",
  gengiva: "Problema gengival",
  extracao: "Extração",
  tratamento: "Em tratamento",
};

const conditionColors: Record<string, string> = {
  saudavel: "bg-green-500",
  caries: "bg-red-500",
  restaurado: "bg-blue-500",
  ausente: "bg-zinc-600",
  implante: "bg-purple-500",
  coroa: "bg-yellow-500",
  endodontia: "bg-orange-500",
  fratura: "bg-red-700",
  sellador: "bg-cyan-500",
  protese: "bg-pink-500",
  inclinado: "bg-amber-600",
  mancha: "bg-stone-400",
  gengiva: "bg-rose-400",
  extracao: "bg-zinc-800",
  tratamento: "bg-teal-500",
};

const professionalOptions = ["Dr. Ricardo", "Dra. Beatriz"];
const serviceOptionsMedica = ["Consulta", "Retorno", "Exame", "Emergência"];
const serviceOptionsOdonto = [
  "Consulta",
  "Limpeza",
  "Restauração",
  "Endodontia",
  "Extração",
  "Clareamento",
  "Prótese",
  "Ortodontia",
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function DemonstracaoPage() {
  const [currentModule, setCurrentModule] = useState<ModuleId>("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSegment, setSelectedSegment] =
    useState<SegmentId>("clinica-medica");
  const [enabledModules, setEnabledModules] = useState<ModuleId[]>([
    "dashboard",
    "agenda",
    "clientes",
    "relatorios",
    "whatsapp",
    "prontuario",
    "lembretes",
    "orcamentos",
    "usuarios",
    "exames",
  ]);

  // Dynamic data
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [prontuarios, setProntuarios] =
    useState<ProntuarioEntry[]>(initialProntuarios);
  const [toothRecords, setToothRecords] =
    useState<ToothRecord[]>(initialToothRecords);
  const [treatmentPlan, setTreatmentPlan] =
    useState<TreatmentItem[]>(initialTreatmentPlan);
  const [lembretes, setLembretes] = useState<Lembrete[]>(initialLembretes);
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>(
    initialWhatsAppMessages,
  );
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>(initialOrcamentos);
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuarios);
  const [exames, setExames] = useState<Exame[]>(initialExames);
  const [permissoes, setPermissoes] = useState<Permissao[]>(initialPermissoes);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentSegment = segmentConfigs.find((s) => s.id === selectedSegment);

  const handleSegmentChange = (segId: SegmentId) => {
    const seg = segmentConfigs.find((s) => s.id === segId);
    if (!seg || !seg.available) return;
    setSelectedSegment(segId);
    setEnabledModules(seg.modules);
    setCurrentModule("dashboard");
  };

  const toggleModule = (mod: ModuleId) => {
    setEnabledModules((prev) => {
      if (prev.includes(mod)) {
        if (prev.length === 1) return prev;
        return prev.filter((m) => m !== mod);
      }
      return [...prev, mod];
    });
  };

  const availableModules: {
    id: ModuleId;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "dashboard", label: "Painel", icon: BarChart3 },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "clientes", label: "Pacientes", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: CreditCard },
    { id: "relatorios", label: "Relatórios", icon: FileText },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "prontuario", label: "Prontuário", icon: FileText },
    { id: "odontograma", label: "Odontograma", icon: Stethoscope },
    { id: "plano-tratamento", label: "Plano Tratamento", icon: Activity },
    { id: "lembretes", label: "Lembretes", icon: Bell },
    { id: "estoque", label: "Estoque", icon: Package },
    { id: "pdv", label: "PDV", icon: ShoppingCart },
    { id: "teleconsulta", label: "Teleconsulta", icon: Video },
    { id: "documentos", label: "Documentos", icon: FileCheck },
    { id: "orcamentos", label: "Orcamentos", icon: FileText },
    { id: "usuarios", label: "Usuarios", icon: Users },
    { id: "exames", label: "Exames", icon: FileCheck },
    { id: "permissoes", label: "Permissoes", icon: Shield },
  ];

  const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

  return (
    <div className="bg-background min-h-screen">
      <aside className="bg-card border-border fixed top-0 left-0 z-40 hidden h-screen w-64 flex-col border-r md:flex">
        <div className="border-border flex items-center gap-2 border-b p-4">
          <Stethoscope className="text-primary size-6" />
          <div>
            <p className="font-semibold">{currentSegment?.businessName}</p>
            <p className="text-muted-foreground text-xs">Nova Iguacu, RJ</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {availableModules
            .filter((item) => enabledModules.includes(item.id))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentModule(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  currentModule === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
        </nav>
        <div className="border-border space-y-2 border-t p-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Bell className="size-4" />
            Notificações
            <Badge className="ml-auto" variant="secondary">
              3
            </Badge>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Settings className="size-4" />
            Configurações
          </Button>
        </div>
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="border-border flex items-center gap-2 border-b p-4">
            <Stethoscope className="text-primary size-6" />
            <div>
              <p className="font-semibold">{currentSegment?.businessName}</p>
              <p className="text-muted-foreground text-xs">Nova Iguaçu, RJ</p>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {availableModules
              .filter((item) => enabledModules.includes(item.id))
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentModule(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    currentModule === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </button>
              ))}
          </nav>
        </SheetContent>
      </Sheet>

      <main className="flex-1 overflow-hidden md:ml-64">
        <header className="bg-card border-border border-b">
          <div className="flex flex-wrap items-center gap-3 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0 shrink-0">
              <h1 className="text-xl font-semibold">
                {currentModule === "dashboard" && "Painel de Controle"}
                {currentModule === "agenda" && "Agenda"}
                {currentModule === "clientes" && "Pacientes"}
                {currentModule === "financeiro" && "Financeiro"}
                {currentModule === "relatorios" && "Relatórios"}
                {currentModule === "whatsapp" && "WhatsApp"}
                {currentModule === "prontuario" && "Prontuário"}
                {currentModule === "odontograma" && "Odontograma"}
                {currentModule === "plano-tratamento" && "Plano de Tratamento"}
                {currentModule === "lembretes" && "Lembretes"}
                {currentModule === "estoque" && "Estoque"}
                {currentModule === "pdv" && "PDV"}
                {currentModule === "teleconsulta" && "Teleconsulta"}
                {currentModule === "documentos" && "Documentos"}
                {currentModule === "orcamentos" && "Orcamentos"}
                {currentModule === "usuarios" && "Usuarios"}
                {currentModule === "exames" && "Exames"}
                {currentModule === "permissoes" && "Permissoes"}
              </h1>
              <p className="text-muted-foreground text-xs">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="bg-border h-8 w-px" />
            <select
              value={selectedSegment}
              onChange={(e) => handleSegmentChange(e.target.value as SegmentId)}
              className="bg-muted rounded border px-2 py-1.5 text-sm"
            >
              {segmentConfigs.map((seg) => (
                <option key={seg.id} value={seg.id} disabled={!seg.available}>
                  {seg.name}
                  {!seg.available ? " (Em desenvolvimento)" : ""}
                </option>
              ))}
            </select>
            <div className="relative min-w-0 flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-muted w-full rounded border py-2 pr-4 pl-9 text-sm"
              />
            </div>
            <Link href="/demonstracao">
              <Button variant="outline" size="sm" className="shrink-0">
                Sair da Demo
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t px-4 py-2">
            <span className="text-muted-foreground text-xs">Modulos:</span>
            <div className="flex flex-wrap gap-1">
              {availableModules
                .filter((mod) => currentSegment?.modules.includes(mod.id))
                .map((mod) => (
                  <Button
                    key={mod.id}
                    variant={
                      enabledModules.includes(mod.id) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleModule(mod.id)}
                    disabled={
                      enabledModules.includes(mod.id) &&
                      enabledModules.length === 1
                    }
                    className="h-6 px-2 text-xs"
                  >
                    {mod.label}
                  </Button>
                ))}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {currentModule === "dashboard" && (
            <DashboardModule
              appointments={appointments}
              patients={patients}
              weeklyData={weeklyData}
              maxRevenue={maxRevenue}
            />
          )}
          {currentModule === "agenda" && (
            <AgendaModule
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              appointments={appointments}
              setAppointments={setAppointments}
              patients={patients}
              isOdonto={selectedSegment === "clinica-odontologica"}
            />
          )}
          {currentModule === "clientes" && (
            <ClientesModule patients={patients} setPatients={setPatients} />
          )}
          {currentModule === "financeiro" && (
            <FinanceiroModule
              appointments={appointments}
              treatmentPlan={treatmentPlan}
            />
          )}
          {currentModule === "relatorios" && (
            <RelatoriosModule
              weeklyData={weeklyData}
              maxRevenue={maxRevenue}
              appointments={appointments}
              patients={patients}
            />
          )}
          {currentModule === "whatsapp" && (
            <WhatsAppModule
              messages={whatsappMessages}
              setMessages={setWhatsappMessages}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          )}
          {currentModule === "prontuario" && (
            <ProntuarioModule
              entries={prontuarios}
              setEntries={setProntuarios}
              patients={patients}
            />
          )}
          {currentModule === "odontograma" && (
            <OdontogramaModule
              records={toothRecords}
              setRecords={setToothRecords}
            />
          )}
          {currentModule === "plano-tratamento" && (
            <PlanoTratamentoModule
              plan={treatmentPlan}
              setPlan={setTreatmentPlan}
              toothRecords={toothRecords}
            />
          )}
          {currentModule === "lembretes" && (
            <LembretesModule
              lembretes={lembretes}
              setLembretes={setLembretes}
              patients={patients}
            />
          )}
          {currentModule === "teleconsulta" && <TeleconsultaModule />}
          {currentModule === "documentos" && <DocumentosModule />}
          {currentModule === "orcamentos" && (
            <OrcamentosModule
              orcamentos={orcamentos}
              setOrcamentos={setOrcamentos}
              patients={patients}
            />
          )}
          {currentModule === "usuarios" && (
            <UsuariosModule usuarios={usuarios} setUsuarios={setUsuarios} />
          )}
          {currentModule === "exames" && (
            <ExamesModule
              exames={exames}
              setExames={setExames}
              patients={patients}
            />
          )}
          {currentModule === "permissoes" && (
            <PermissoesModule
              permissoes={permissoes}
              setPermissoes={setPermissoes}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dashboard Module
// ---------------------------------------------------------------------------

function DashboardModule({
  appointments,
  patients,
  weeklyData,
  maxRevenue,
}: {
  appointments: Appointment[];
  patients: Patient[];
  weeklyData: { day: string; revenue: number; appointments: number }[];
  maxRevenue: number;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const todayStr = "2026-08-05";
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const todayConfirmed = todayAppointments.filter(
    (a) => a.status === "confirmado",
  ).length;
  const todayPending = todayAppointments.filter(
    (a) => a.status === "agendado",
  ).length;
  const todayRevenue = todayAppointments
    .filter((a) => a.status === "realizado")
    .reduce((s, a) => s + a.amount, 0);
  const monthRevenue = 28450;

  const birthdayPatients = patients.filter((p) => {
    const month = new Date(p.birthDate + "T00:00:00").getMonth() + 1;
    return month === 8;
  });

  const faltouAppointments = appointments.filter((a) => a.status === "faltou");
  const canceladoAppointments = appointments.filter(
    (a) => a.status === "cancelado",
  );
  const upcomingRetornos = appointments.filter(
    (a) =>
      a.service.toLowerCase().includes("retorno") &&
      a.status !== "realizado" &&
      a.status !== "cancelado" &&
      a.status !== "faltou",
  );

  const searchResults = searchQuery.trim()
    ? patients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.cpf.includes(searchQuery) ||
          p.phone.includes(searchQuery),
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Quick Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar paciente por nome, CPF ou telefone..."
              className="w-full rounded-lg border py-2.5 pr-4 pl-10 text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.trim().length > 0);
              }}
              onFocus={() => {
                if (searchQuery.trim()) setShowSearchResults(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSearchResults(false), 200);
              }}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border bg-white shadow-lg">
                {searchResults.slice(0, 8).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between border-b px-4 py-3 last:border-b-0 hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-muted-foreground text-xs">
                        CPF: {p.cpf} | Tel: {p.phone}
                      </p>
                    </div>
                    <Badge
                      variant={p.status === "ativo" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {showSearchResults &&
              searchQuery.trim().length > 0 &&
              searchResults.length === 0 && (
                <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border bg-white p-4 shadow-lg">
                  <p className="text-muted-foreground text-sm">
                    Nenhum paciente encontrado
                  </p>
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards - Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Consultas hoje</p>
                <p className="text-2xl font-bold">{todayAppointments.length}</p>
              </div>
              <Calendar className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-green-600">
              {todayConfirmed} confirmadas, {todayPending} pendentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Faturamento hoje
                </p>
                <p className="text-2xl font-bold">
                  R$ {todayRevenue.toLocaleString("pt-BR")}
                </p>
              </div>
              <DollarSign className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-green-600">+12% vs. ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Pacientes ativos
                </p>
                <p className="text-2xl font-bold">
                  {patients.filter((p) => p.status === "ativo").length}
                </p>
              </div>
              <Users className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-green-600">+3 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Faturamento do mes
                </p>
                <p className="text-2xl font-bold">
                  R$ {monthRevenue.toLocaleString("pt-BR")}
                </p>
              </div>
              <Activity className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-green-600">+8% vs. mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Stat Cards - Row 2 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Aniversariantes do mes
                </p>
                <p className="text-2xl font-bold">{birthdayPatients.length}</p>
              </div>
              <CalendarPlus className="text-muted-foreground size-8" />
            </div>
            {birthdayPatients.length > 0 ? (
              <p className="mt-1 truncate text-sm text-green-600">
                {birthdayPatients
                  .slice(0, 2)
                  .map((p) => p.name)
                  .join(", ")}
                {birthdayPatients.length > 2 &&
                  ` +${birthdayPatients.length - 2}`}
              </p>
            ) : (
              <p className="text-muted-foreground mt-1 text-sm">
                Nenhum aniversariante
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Faltas este mes</p>
                <p className="text-2xl font-bold">
                  {faltouAppointments.length}
                </p>
              </div>
              <AlertTriangle className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-orange-600">
              {faltouAppointments.length > 0
                ? `${faltouAppointments.length} paciente(s) faltou`
                : "Nenhuma falta"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Cancelamentos</p>
                <p className="text-2xl font-bold">
                  {canceladoAppointments.length}
                </p>
              </div>
              <XCircle className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-red-600">
              {canceladoAppointments.length > 0
                ? `${canceladoAppointments.length} consulta(s) cancelada(s)`
                : "Nenhum cancelamento"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Proximos retornos
                </p>
                <p className="text-2xl font-bold">{upcomingRetornos.length}</p>
              </div>
              <CheckCircle2 className="text-muted-foreground size-8" />
            </div>
            <p className="mt-1 text-sm text-blue-600">
              {upcomingRetornos.length > 0
                ? `${upcomingRetornos.length} retorno(s) agendado(s)`
                : "Nenhum retorno"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Aniversariantes do mes */}
      <Card>
        <CardHeader>
          <CardTitle>Aniversariantes do mes</CardTitle>
        </CardHeader>
        <CardContent>
          {birthdayPatients.length > 0 ? (
            <div className="space-y-3">
              {birthdayPatients.map((p) => {
                const day = new Date(p.birthDate + "T00:00:00").getDate();
                const month =
                  new Date(p.birthDate + "T00:00:00").getMonth() + 1;
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                        <CalendarPlus className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-muted-foreground text-xs">
                          Aniversario: {String(day).padStart(2, "0")}/
                          {String(month).padStart(2, "0")} | Tel: {p.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Nenhum aniversariante este mes
            </p>
          )}
        </CardContent>
      </Card>

      {/* Consultas que faltaram */}
      <Card>
        <CardHeader>
          <CardTitle>Consultas que faltaram</CardTitle>
        </CardHeader>
        <CardContent>
          {faltouAppointments.length > 0 ? (
            <div className="space-y-3">
              {faltouAppointments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3"
                >
                  <div>
                    <p className="font-medium">{a.patientName}</p>
                    <p className="text-muted-foreground text-xs">
                      {a.date} as {a.time} | {a.professional}
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-xs text-yellow-800">
                    faltou
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Nenhuma consulta com falta este mes
            </p>
          )}
        </CardContent>
      </Card>

      {/* Consultas canceladas */}
      <Card>
        <CardHeader>
          <CardTitle>Consultas canceladas</CardTitle>
        </CardHeader>
        <CardContent>
          {canceladoAppointments.length > 0 ? (
            <div className="space-y-3">
              {canceladoAppointments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <div>
                    <p className="font-medium">{a.patientName}</p>
                    <p className="text-muted-foreground text-xs">
                      {a.date} as {a.time} | {a.service} - {a.professional}
                    </p>
                  </div>
                  <Badge className="bg-red-100 text-xs text-red-800">
                    cancelado
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Nenhuma consulta cancelada este mes
            </p>
          )}
        </CardContent>
      </Card>

      {/* Proximos retornos */}
      <Card>
        <CardHeader>
          <CardTitle>Proximos retornos</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingRetornos.length > 0 ? (
            <div className="space-y-3">
              {upcomingRetornos.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3"
                >
                  <div>
                    <p className="font-medium">{a.patientName}</p>
                    <p className="text-muted-foreground text-xs">
                      {a.date} as {a.time} | {a.professional}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-xs text-blue-800">
                    retorno
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground py-4 text-center text-sm">
              Nenhum retorno agendado
            </p>
          )}
        </CardContent>
      </Card>

      {/* Chart + Upcoming Appointments */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {weeklyData.map((d) => (
                <div
                  key={d.day}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <span className="text-muted-foreground text-xs">
                    R$ {d.revenue}
                  </span>
                  <div
                    className="bg-primary w-full rounded-t"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-muted-foreground text-xs">{d.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proximas consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments
                .filter(
                  (a) =>
                    a.status !== "realizado" &&
                    a.status !== "cancelado" &&
                    a.status !== "faltou",
                )
                .slice(0, 5)
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="font-medium">{a.patientName}</p>
                      <p className="text-muted-foreground text-xs">
                        {a.service} - {a.professional}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{a.time}</p>
                      <Badge
                        variant={
                          a.status === "confirmado" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {a.status}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Agenda Module (Interactive)
// ---------------------------------------------------------------------------

function AgendaModule({
  selectedDate,
  setSelectedDate,
  appointments,
  setAppointments,
  patients,
  isOdonto,
}: {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  patients: Patient[];
  isOdonto: boolean;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [form, setForm] = useState({
    patientId: "",
    professional: "Dr. Ricardo",
    service: "",
    date: "2026-08-05",
    time: "09:00",
    notes: "",
  });

  const dateStr = selectedDate.toISOString().split("T")[0];
  const dayAppointments = appointments.filter((a) => a.date === dateStr);
  const services = isOdonto ? serviceOptionsOdonto : serviceOptionsMedica;

  const handleSave = () => {
    const patient = patients.find((p) => p.id === Number(form.patientId));
    if (!patient) return;
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === editingAppointment.id
            ? {
                ...a,
                patientId: patient.id,
                patientName: patient.name,
                professional: form.professional,
                service: form.service,
                date: form.date,
                time: form.time,
                notes: form.notes,
              }
            : a,
        ),
      );
    } else {
      const newAppt: Appointment = {
        id: Date.now(),
        date: form.date,
        time: form.time,
        patientId: patient.id,
        patientName: patient.name,
        professional: form.professional,
        service: form.service,
        amount: 0,
        status: "agendado",
        notes: form.notes,
      };
      setAppointments((prev) => [...prev, newAppt]);
    }
    setShowForm(false);
    setEditingAppointment(null);
    setForm({
      patientId: "",
      professional: "Dr. Ricardo",
      service: "",
      date: dateStr,
      time: "09:00",
      notes: "",
    });
  };

  const handleEdit = (appt: Appointment) => {
    setEditingAppointment(appt);
    setForm({
      patientId: String(appt.patientId),
      professional: appt.professional,
      service: appt.service,
      date: appt.date,
      time: appt.time,
      notes: appt.notes,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleStatusChange = (id: number, status: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
  };

  const statusColors: Record<string, string> = {
    agendado: "bg-blue-100 text-blue-800",
    confirmado: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
    realizado: "bg-zinc-100 text-zinc-800",
    faltou: "bg-orange-100 text-orange-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() - 1)),
              )
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="text-center">
            <p className="font-semibold">
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
              })}
            </p>
            <p className="text-muted-foreground text-sm">
              {dayAppointments.length} consultas
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 1)),
              )
            }
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <Button
          onClick={() => {
            setEditingAppointment(null);
            setForm({
              patientId: "",
              professional: "Dr. Ricardo",
              service: "",
              date: dateStr,
              time: "09:00",
              notes: "",
            });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Nova consulta
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Agenda exportado em PDF com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar PDF
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingAppointment ? "Editar consulta" : "Agendar consulta"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingAppointment(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Paciente</label>
                <select
                  value={form.patientId}
                  onChange={(e) =>
                    setForm({ ...form, patientId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {patients
                    .filter((p) => p.status === "ativo")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Profissional</label>
                <select
                  value={form.professional}
                  onChange={(e) =>
                    setForm({ ...form, professional: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  {professionalOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Servico</label>
                <select
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Data</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Horario</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Observacoes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Opcional"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!form.patientId || !form.service}
              >
                <Save className="mr-2 size-4" />{" "}
                {editingAppointment ? "Salvar" : "Agendar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingAppointment(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {dayAppointments.length === 0 && (
          <Card>
            <CardContent className="text-muted-foreground p-8 text-center">
              Nenhuma consulta para este dia
            </CardContent>
          </Card>
        )}
        {dayAppointments
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((appt) => (
            <Card key={appt.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold">{appt.time}</p>
                    </div>
                    <div>
                      <p className="font-medium">{appt.patientName}</p>
                      <p className="text-muted-foreground text-sm">
                        {appt.service} - {appt.professional}
                      </p>
                      {appt.notes && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          {appt.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[appt.status]}>
                      {appt.status}
                    </Badge>
                    {appt.status === "agendado" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-green-600"
                          onClick={() =>
                            handleStatusChange(appt.id, "confirmado")
                          }
                        >
                          <Check className="size-3" /> Confirmar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-red-600"
                          onClick={() =>
                            handleStatusChange(appt.id, "cancelado")
                          }
                        >
                          <X className="size-3" /> Cancelar
                        </Button>
                      </>
                    )}
                    {appt.status === "confirmado" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() =>
                            handleStatusChange(appt.id, "realizado")
                          }
                        >
                          <CheckCircle2 className="size-3" /> Realizar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 text-orange-600"
                          onClick={() => handleStatusChange(appt.id, "faltou")}
                        >
                          <AlertTriangle className="size-3" /> Falta
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(appt)}
                    >
                      <Edit className="size-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(appt.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Clientes (Pacientes) Module (Interactive)
// ---------------------------------------------------------------------------

function ClientesModule({
  patients,
  setPatients,
}: {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    cpf: "",
  });

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.cpf.includes(searchTerm),
  );

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? { ...p, ...form } : p)),
      );
    } else {
      setPatients((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          lastVisit: "",
          totalSpent: 0,
          status: "ativo" as const,
        },
      ]);
    }
    setShowForm(false);
    setEditingPatient(null);
    setForm({ name: "", phone: "", email: "", birthDate: "", cpf: "" });
  };

  const handleEdit = (p: Patient) => {
    setEditingPatient(p);
    setForm({
      name: p.name,
      phone: p.phone,
      email: p.email,
      birthDate: p.birthDate,
      cpf: p.cpf,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "ativo" ? "inativo" : "ativo" }
          : p,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, telefone ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-muted w-full rounded border py-2 pr-4 pl-9 text-sm"
          />
        </div>
        <Button
          onClick={() => {
            setEditingPatient(null);
            setForm({ name: "", phone: "", email: "", birthDate: "", cpf: "" });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <UserPlus className="size-4" /> Novo paciente
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Pacientes exportado em PDF com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Pacientes exportado em EXCEL com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar Excel
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingPatient ? "Editar paciente" : "Cadastrar paciente"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingPatient(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Nome completo</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Telefone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="(21) 99999-9999"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">CPF</label>
                <input
                  type="text"
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm({ ...form, birthDate: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleSave} disabled={!form.name || !form.phone}>
                <Save className="mr-2 size-4" />{" "}
                {editingPatient ? "Salvar" : "Cadastrar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingPatient(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                    <Users className="text-primary size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{p.name}</p>
                      <Badge
                        variant={p.status === "ativo" ? "default" : "secondary"}
                      >
                        {p.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {p.phone} | {p.email}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      CPF: {p.cpf} | Nascimento:{" "}
                      {p.birthDate
                        ? new Date(
                            p.birthDate + "T00:00:00",
                          ).toLocaleDateString("pt-BR")
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium">
                      R$ {p.totalSpent.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Ultima visita:{" "}
                      {p.lastVisit
                        ? new Date(
                            p.lastVisit + "T00:00:00",
                          ).toLocaleDateString("pt-BR")
                        : "-"}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleStatus(p.id)}
                  >
                    {p.status === "ativo" ? (
                      <XCircle className="size-3" />
                    ) : (
                      <CheckCircle2 className="size-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(p)}
                  >
                    <Edit className="size-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Permissoes Module
// ---------------------------------------------------------------------------

function PermissoesModule({
  permissoes,
  setPermissoes,
}: {
  permissoes: Permissao[];
  setPermissoes: React.Dispatch<React.SetStateAction<Permissao[]>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Permissao | null>(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo: "dentista" as "admin" | "dentista" | "secretaria",
    permissoes: [] as string[],
  });

  const allPermissions = [
    "agenda",
    "prontuario",
    "odontograma",
    "exames",
    "pacientes",
    "whatsapp",
    "orcamentos",
    "financeiro",
    "relatorios",
  ];

  const totalAdmins = permissoes.filter((p) => p.cargo === "admin").length;
  const totalDentistas = permissoes.filter(
    (p) => p.cargo === "dentista",
  ).length;
  const totalSecretarias = permissoes.filter(
    (p) => p.cargo === "secretaria",
  ).length;

  const handleSave = () => {
    if (editingItem) {
      setPermissoes((prev) =>
        prev.map((p) =>
          p.id === editingItem.id
            ? {
                ...p,
                nome: form.nome,
                email: form.email,
                cargo: form.cargo,
                permissoes: form.permissoes,
              }
            : p,
        ),
      );
    } else {
      const newItem: Permissao = {
        id: Date.now(),
        nome: form.nome,
        email: form.email,
        cargo: form.cargo,
        permissoes: form.permissoes,
        ativo: true,
      };
      setPermissoes((prev) => [...prev, newItem]);
    }
    setShowForm(false);
    setEditingItem(null);
    setForm({ nome: "", email: "", cargo: "dentista", permissoes: [] });
  };

  const handleEdit = (item: Permissao) => {
    setEditingItem(item);
    setForm({
      nome: item.nome,
      email: item.email,
      cargo: item.cargo,
      permissoes: [...item.permissoes],
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPermissoes((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleAtivo = (id: number) => {
    setPermissoes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p)),
    );
  };

  const togglePermission = (perm: string) => {
    setForm((prev) => {
      const exists = prev.permissoes.includes(perm);
      return {
        ...prev,
        permissoes: exists
          ? prev.permissoes.filter((p) => p !== perm)
          : [...prev.permissoes, perm],
      };
    });
  };

  const cargoColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    dentista: "bg-blue-100 text-blue-700",
    secretaria: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Permissoes</h2>
        <Button
          onClick={() => {
            setEditingItem(null);
            setForm({ nome: "", email: "", cargo: "dentista", permissoes: [] });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Nova permissao
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total usuarios</p>
            <p className="text-2xl font-bold">{permissoes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Admins</p>
            <p className="text-2xl font-bold text-purple-600">{totalAdmins}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Dentistas</p>
            <p className="text-2xl font-bold text-blue-600">{totalDentistas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Secretarias</p>
            <p className="text-2xl font-bold text-green-600">
              {totalSecretarias}
            </p>
          </CardContent>
        </Card>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingItem ? "Editar permissao" : "Nova permissao"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Cargo</label>
                <select
                  value={form.cargo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cargo: e.target.value as
                        "admin" | "dentista" | "secretaria",
                    })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="admin">Admin</option>
                  <option value="dentista">Dentista</option>
                  <option value="secretaria">Secretaria</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium">Permissoes</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {allPermissions.map((perm) => (
                  <Button
                    key={perm}
                    variant={
                      form.permissoes.includes(perm) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => togglePermission(perm)}
                    className="h-7 text-xs"
                  >
                    {perm}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!form.nome || !form.email}>
                {editingItem ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {permissoes.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
                    <Shield className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{p.nome}</p>
                    <p className="text-muted-foreground text-xs">{p.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cargoColors[p.cargo]}>{p.cargo}</Badge>
                  <div className="flex flex-wrap gap-1">
                    {p.permissoes.map((perm) => (
                      <Badge key={perm} variant="secondary" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant={p.ativo ? "default" : "secondary"}>
                    {p.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(p)}
                    >
                      <Edit className="size-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleAtivo(p.id)}
                    >
                      {p.ativo ? (
                        <XCircle className="size-3" />
                      ) : (
                        <CheckCircle2 className="size-3" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Financeiro Module
// ---------------------------------------------------------------------------

function FinanceiroModule({
  appointments,
  treatmentPlan,
}: {
  appointments: Appointment[];
  treatmentPlan: TreatmentItem[];
}) {
  const totalReceita = appointments
    .filter((a) => a.status === "realizado")
    .reduce((s, a) => s + a.amount, 0);
  const totalPendente = appointments
    .filter((a) => a.status === "confirmado" || a.status === "agendado")
    .reduce((s, a) => s + a.amount, 0);
  const totalTratamentos = treatmentPlan.reduce((s, t) => s + t.value, 0);
  const valorRecebido = treatmentPlan
    .filter((t) => t.status === "concluido")
    .reduce((s, t) => s + t.value, 0);
  const valorAberto = totalTratamentos - valorRecebido;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Financeiro</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Financeiro exportado em PDF com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Financeiro exportado em EXCEL com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar Excel
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Receita realizada</p>
            <p className="text-2xl font-bold">
              R$ {totalReceita.toLocaleString("pt-BR")}
            </p>
            <p className="mt-1 text-sm text-green-600">+12% vs. mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">A receber</p>
            <p className="text-2xl font-bold text-orange-500">
              R$ {totalPendente.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">
              Valor total tratamentos
            </p>
            <p className="text-2xl font-bold">
              R$ {totalTratamentos.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">
              Em aberto (tratamentos)
            </p>
            <p className="text-2xl font-bold text-red-500">
              R$ {valorAberto.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Consultas por status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(
                [
                  "realizado",
                  "confirmado",
                  "agendado",
                  "faltou",
                  "cancelado",
                ] as const
              ).map((status) => {
                const count = appointments.filter(
                  (a) => a.status === status,
                ).length;
                const pct = Math.round((count / appointments.length) * 100);
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{status}</span>
                      <span className="font-medium">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recebimentos por tratamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {treatmentPlan.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Dente {t.toothId} - {t.procedure}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Sessoes: {t.completedSessions}/{t.sessions}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">R$ {t.value}</p>
                    <Badge
                      variant={
                        t.status === "concluido"
                          ? "default"
                          : t.status === "em_execucao"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {t.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Relatorios Module
// ---------------------------------------------------------------------------

function RelatoriosModule({
  weeklyData,
  maxRevenue,
  appointments,
  patients,
}: {
  weeklyData: { day: string; revenue: number; appointments: number }[];
  maxRevenue: number;
  appointments: Appointment[];
  patients: Patient[];
}) {
  const totalAppointments = appointments.length;
  const totalRevenue = appointments
    .filter((a) => a.status === "realizado")
    .reduce((s, a) => s + a.amount, 0);
  const noShowRate = Math.round(
    (appointments.filter((a) => a.status === "faltou").length /
      totalAppointments) *
      100,
  );
  const confirmRate = Math.round(
    (appointments.filter(
      (a) => a.status === "confirmado" || a.status === "realizado",
    ).length /
      totalAppointments) *
      100,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Relatorios</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Relatórios exportado em PDF com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              alert(`Relatório Relatórios exportado em EXCEL com sucesso!`)
            }
          >
            <Download className="size-4" /> Exportar Excel
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total consultas</p>
            <p className="text-2xl font-bold">{totalAppointments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Receita total</p>
            <p className="text-2xl font-bold">
              R$ {totalRevenue.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Taxa de no-show</p>
            <p className="text-2xl font-bold text-red-500">{noShowRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Taxa de confirmação</p>
            <p className="text-2xl font-bold text-green-600">{confirmRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faturamento semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end gap-2">
            {weeklyData.map((d) => (
              <div
                key={d.day}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span className="text-muted-foreground text-xs">
                  R$ {d.revenue}
                </span>
                <div
                  className="bg-primary w-full rounded-t"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-muted-foreground text-xs">{d.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pacientes mais ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {patients
                .filter((p) => p.status === "ativo")
                .sort((a, b) => b.totalSpent - a.totalSpent)
                .slice(0, 5)
                .map((p, i) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-sm font-bold">
                        #{i + 1}
                      </span>
                      <p className="font-medium">{p.name}</p>
                    </div>
                    <p className="font-medium">
                      R$ {p.totalSpent.toLocaleString("pt-BR")}
                    </p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Desempenho por profissional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {professionalOptions.map((prof) => {
                const profAppts = appointments.filter(
                  (a) => a.professional === prof,
                );
                const profRevenue = profAppts
                  .filter((a) => a.status === "realizado")
                  .reduce((s, a) => s + a.amount, 0);
                return (
                  <div key={prof} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{prof}</span>
                      <span className="font-medium">
                        {profAppts.length} consultas - R${" "}
                        {profRevenue.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${(profRevenue / Math.max(totalRevenue, 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WhatsApp Module (Interactive)
// ---------------------------------------------------------------------------

function WhatsAppModule({
  messages,
  setMessages,
  appointments,
  setAppointments,
}: {
  messages: WhatsAppMessage[];
  setMessages: React.Dispatch<React.SetStateAction<WhatsAppMessage[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}) {
  const pendingCount = messages.filter((m) => m.status === "pendente").length;

  const handleConfirm = (msg: WhatsAppMessage) => {
    if (msg.appointmentId) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === msg.appointmentId ? { ...a, status: "confirmado" } : a,
        ),
      );
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id
          ? { ...m, status: "respondido" as const, actionTaken: true }
          : m,
      ),
    );
  };

  const handleCancel = (msg: WhatsAppMessage) => {
    if (msg.appointmentId) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === msg.appointmentId ? { ...a, status: "cancelado" } : a,
        ),
      );
    }
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msg.id
          ? { ...m, status: "respondido" as const, actionTaken: true }
          : m,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Mensagens hoje</p>
            <p className="text-2xl font-bold">{messages.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-orange-500">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Taxa de resposta</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(
                ((messages.length - pendingCount) /
                  Math.max(messages.length, 1)) *
                  100,
              )}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversas recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <MessageSquare className="text-primary size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{msg.patientName}</p>
                      <p className="text-muted-foreground text-xs">
                        {msg.time}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        variant={
                          msg.direction === "enviado" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {msg.direction === "enviado" ? "Enviado" : "Recebido"}
                      </Badge>
                      <Badge
                        variant={
                          msg.status === "lido"
                            ? "default"
                            : msg.status === "pendente"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {msg.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {msg.message}
                    </p>

                    {msg.action === "confirmar" &&
                      !msg.actionTaken &&
                      msg.direction === "enviado" && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            className="gap-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleConfirm(msg)}
                          >
                            <Check className="size-3" /> Confirmar consulta
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-red-600"
                            onClick={() => handleCancel(msg)}
                          >
                            <X className="size-3" /> Cancelar
                          </Button>
                        </div>
                      )}
                    {msg.actionTaken && (
                      <p className="mt-2 text-xs font-medium text-green-600">
                        Acao realizada
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prontuario Module (Interactive)
// ---------------------------------------------------------------------------

function ProntuarioModule({
  entries,
  setEntries,
  patients,
}: {
  entries: ProntuarioEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ProntuarioEntry[]>>;
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ProntuarioEntry | null>(
    null,
  );
  const [form, setForm] = useState({
    patientId: "",
    professional: "Dr. Ricardo",
    type: "consulta" as ProntuarioEntry["type"],
    notes: "",
    prescription: "",
    cid: "",
  });

  const handleSave = () => {
    const patient = patients.find((p) => p.id === Number(form.patientId));
    if (!patient) return;
    if (editingEntry) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingEntry.id
            ? {
                ...e,
                ...form,
                patientId: Number(form.patientId),
                patientName: patient.name,
                date: new Date().toISOString().split("T")[0],
              }
            : e,
        ),
      );
    } else {
      setEntries((prev) => [
        ...prev,
        {
          id: Date.now(),
          patientId: Number(form.patientId),
          professional: form.professional,
          type: form.type,
          notes: form.notes,
          prescription: form.prescription,
          cid: form.cid,
          patientName: patient.name,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setShowForm(false);
    setEditingEntry(null);
    setForm({
      patientId: "",
      professional: "Dr. Ricardo",
      type: "consulta",
      notes: "",
      prescription: "",
      cid: "",
    });
  };

  const handleEdit = (entry: ProntuarioEntry) => {
    setEditingEntry(entry);
    setForm({
      patientId: String(entry.patientId),
      professional: entry.professional,
      type: entry.type,
      notes: entry.notes,
      prescription: entry.prescription,
      cid: entry.cid,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const typeColors: Record<string, string> = {
    consulta: "default",
    retorno: "secondary",
    exame: "outline",
    emergencia: "destructive",
  };

  const todayCount = entries.filter(
    (e) => e.date === new Date().toISOString().split("T")[0],
  ).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Consultas hoje</p>
                <p className="text-2xl font-bold">{todayCount}</p>
              </div>
              <Calendar className="text-muted-foreground size-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">CID mais usado</p>
                <p className="text-2xl font-bold">M54.5</p>
              </div>
              <Badge className="bg-violet-100 text-violet-800">Top CID</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">
                  Tempo médio de consulta
                </p>
                <p className="text-2xl font-bold">24 min</p>
              </div>
              <Clock className="text-muted-foreground size-8" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Taxa de retorno</p>
                <p className="text-2xl font-bold text-green-600">68%</p>
              </div>
              <Activity className="text-muted-foreground size-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {entries.length} registros
        </p>
        <Button
          onClick={() => {
            setEditingEntry(null);
            setForm({
              patientId: "",
              professional: "Dr. Ricardo",
              type: "consulta",
              notes: "",
              prescription: "",
              cid: "",
            });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <FileText className="size-4" /> Novo prontuário
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingEntry ? "Editar prontuário" : "Novo prontuário"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingEntry(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Paciente</label>
                <select
                  value={form.patientId}
                  onChange={(e) =>
                    setForm({ ...form, patientId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {patients
                    .filter((p) => p.status === "ativo")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Profissional</label>
                <select
                  value={form.professional}
                  onChange={(e) =>
                    setForm({ ...form, professional: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  {professionalOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      type: e.target.value as typeof form.type,
                    })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="consulta">Consulta</option>
                  <option value="retorno">Retorno</option>
                  <option value="exame">Exame</option>
                  <option value="emergencia">Emergência</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">CID-10</label>
                <input
                  type="text"
                  value={form.cid}
                  onChange={(e) => setForm({ ...form, cid: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Ex: M54.5"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Notas clínicas</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Evolução do paciente..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Prescrição</label>
                <textarea
                  value={form.prescription}
                  onChange={(e) =>
                    setForm({ ...form, prescription: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  rows={2}
                  placeholder="Medicamento - posologia - duracao"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!form.patientId || !form.notes}
              >
                <Save className="mr-2 size-4" />{" "}
                {editingEntry ? "Salvar" : "Registrar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingEntry(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {entries
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{entry.patientName}</p>
                      <Badge
                        variant={
                          typeColors[entry.type] as
                            "default" | "secondary" | "outline"
                        }
                      >
                        {entry.type}
                      </Badge>
                      {entry.cid && (
                        <Badge variant="outline" className="text-xs">
                          CID: {entry.cid}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {new Date(entry.date + "T00:00:00").toLocaleDateString(
                        "pt-BR",
                      )}{" "}
                      - {entry.professional}
                    </p>
                    <p className="mt-2 text-sm">{entry.notes}</p>
                    {entry.prescription && (
                      <div className="bg-muted mt-2 rounded p-2">
                        <p className="text-xs font-medium">Prescrição:</p>
                        <p className="text-muted-foreground text-xs">
                          {entry.prescription}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(entry)}
                    >
                      <Edit className="size-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Odontograma Module (5 Faces, 15 Condicoes)
// ---------------------------------------------------------------------------

function OdontogramaModule({
  records,
  setRecords,
}: {
  records: ToothRecord[];
  setRecords: React.Dispatch<React.SetStateAction<ToothRecord[]>>;
}) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    condition: "saudavel" as ToothRecord["condition"],
    vestbular: false,
    lingual: false,
    mesial: false,
    distal: false,
    oclusal: false,
    notes: "",
  });

  const faceLabels: Record<string, string> = {
    vestbular: "Vestibular",
    lingual: "Lingual",
    mesial: "Mesial",
    distal: "Distal",
    oclusal: "Oclusal",
  };

  const teeth = useMemo(() => {
    const upperRight = [18, 17, 16, 15, 14, 13, 12, 11];
    const upperLeft = [21, 22, 23, 24, 25, 26, 27, 28];
    const lowerLeft = [31, 32, 33, 34, 35, 36, 37, 38];
    const lowerRight = [48, 47, 46, 45, 44, 43, 42, 41];
    return { upperRight, upperLeft, lowerLeft, lowerRight };
  }, []);

  const getRecord = (toothId: number) =>
    records.find((r) => r.toothId === toothId);

  const handleSaveRecord = () => {
    if (!selectedTooth) return;
    const existing = getRecord(selectedTooth);
    const newRecord: ToothRecord = {
      toothId: selectedTooth,
      condition: form.condition,
      faces: {
        vestbular: form.vestbular,
        lingual: form.lingual,
        mesial: form.mesial,
        distal: form.distal,
        oclusal: form.oclusal,
      },
      date: new Date().toISOString().split("T")[0],
      professional: "Dr. Ricardo",
      notes: form.notes,
    };

    if (existing) {
      setRecords((prev) =>
        prev.map((r) => (r.toothId === selectedTooth ? newRecord : r)),
      );
    } else {
      setRecords((prev) => [...prev, newRecord]);
    }
    setShowForm(false);
    setForm({
      condition: "saudavel",
      vestbular: false,
      lingual: false,
      mesial: false,
      distal: false,
      oclusal: false,
      notes: "",
    });
  };

  const handleToothClick = (toothId: number) => {
    setSelectedTooth(toothId);
    const existing = getRecord(toothId);
    if (existing) {
      setForm({
        condition: existing.condition,
        vestbular: existing.faces.vestbular,
        lingual: existing.faces.lingual,
        mesial: existing.faces.mesial,
        distal: existing.faces.distal,
        oclusal: existing.faces.oclusal,
        notes: existing.notes,
      });
    } else {
      setForm({
        condition: "saudavel",
        vestbular: false,
        lingual: false,
        mesial: false,
        distal: false,
        oclusal: false,
        notes: "",
      });
    }
    setShowForm(true);
  };

  const handleDeleteRecord = (toothId: number) => {
    setRecords((prev) => prev.filter((r) => r.toothId !== toothId));
    setShowForm(false);
    setSelectedTooth(null);
  };

  const ToothButton = ({ id }: { id: number }) => {
    const record = getRecord(id);
    const color = record ? conditionColors[record.condition] : "bg-green-500";
    const hasActiveFaces = record && Object.values(record.faces).some(Boolean);
    return (
      <button
        onClick={() => handleToothClick(id)}
        className={`hover:ring-primary/50 relative flex size-10 items-center justify-center rounded-lg border text-xs font-bold text-white transition-all hover:scale-110 hover:ring-2 ${color} ${selectedTooth === id ? "ring-primary scale-110 ring-2" : ""}`}
        title={`Dente ${id} - ${record ? conditionLabels[record.condition] : "Saudavel"}`}
      >
        {id}
        {hasActiveFaces && (
          <span className="absolute -top-1 -right-1 size-2 rounded-full bg-yellow-400" />
        )}
      </button>
    );
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of records) {
      c[r.condition] = (c[r.condition] || 0) + 1;
    }
    return c;
  }, [records]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total dentes</p>
            <p className="text-2xl font-bold">32</p>
          </CardContent>
        </Card>
        {Object.entries(counts)
          .filter(([, v]) => v > 0)
          .map(([key, val]) => (
            <Card key={key}>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-sm">
                  {conditionLabels[key]}
                </p>
                <p className="text-2xl font-bold">{val}</p>
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Odontograma - Maria Silva</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-3">
            {Object.entries(conditionLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <div
                  className={`size-3 rounded-full ${conditionColors[key]}`}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Arcada Superior - Direita
              </p>
              <div className="flex gap-2">
                {teeth.upperRight.map((id) => (
                  <ToothButton key={id} id={id} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Arcada Superior - Esquerda
              </p>
              <div className="flex gap-2">
                {teeth.upperLeft.map((id) => (
                  <ToothButton key={id} id={id} />
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Arcada Inferior - Esquerda
              </p>
              <div className="flex gap-2">
                {teeth.lowerLeft.map((id) => (
                  <ToothButton key={id} id={id} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Arcada Inferior - Direita
              </p>
              <div className="flex gap-2">
                {teeth.lowerRight.map((id) => (
                  <ToothButton key={id} id={id} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showForm && selectedTooth && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dente {selectedTooth} - Editar condicao</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setSelectedTooth(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Condicao</label>
                <select
                  value={form.condition}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      condition: e.target.value as ToothRecord["condition"],
                    })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  {Object.entries(conditionLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Faces afetadas</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    Object.keys(faceLabels) as Array<keyof typeof faceLabels>
                  ).map((face) => (
                    <button
                      key={face}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          [face]: !form[face as keyof typeof form],
                        })
                      }
                      className={`rounded-full border px-3 py-1 text-xs transition-colors ${form[face as keyof typeof form] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      {faceLabels[face]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Observacoes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Detalhes do procedimento..."
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleSaveRecord}>
                <Save className="mr-2 size-4" /> Salvar
              </Button>
              <Button
                variant="outline"
                className="text-red-600"
                onClick={() => handleDeleteRecord(selectedTooth)}
              >
                <Trash2 className="mr-2 size-4" /> Remover
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setSelectedTooth(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {records.length > 0 && !showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Historico de registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {records
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((r) => (
                  <div
                    key={r.toothId}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-8 items-center justify-center rounded text-xs font-bold text-white ${conditionColors[r.condition]}`}
                      >
                        {r.toothId}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Dente {r.toothId} - {conditionLabels[r.condition]}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {Object.entries(r.faces)
                            .filter(([, v]) => v)
                            .map(([k]) => faceLabels[k])
                            .join(", ") || "Sem faces"}{" "}
                          | {r.date} - {r.professional}
                        </p>
                        {r.notes && (
                          <p className="text-muted-foreground mt-0.5 text-xs">
                            {r.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToothClick(r.toothId)}
                    >
                      <Edit className="size-3" />
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plano de Tratamento Module (Interactive)
// ---------------------------------------------------------------------------

function PlanoTratamentoModule({
  plan,
  setPlan,
  toothRecords,
}: {
  plan: TreatmentItem[];
  setPlan: React.Dispatch<React.SetStateAction<TreatmentItem[]>>;
  toothRecords: ToothRecord[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<TreatmentItem | null>(null);
  const [form, setForm] = useState({
    toothId: "",
    procedure: "",
    value: "",
    sessions: "1",
    notes: "",
  });

  const totalValue = plan.reduce((s, t) => s + t.value, 0);
  const paidValue = plan
    .filter((t) => t.status === "concluido")
    .reduce((s, t) => s + t.value, 0);
  const pendingValue = totalValue - paidValue;

  const handleSave = () => {
    if (!form.toothId || !form.procedure) return;
    if (editingItem) {
      setPlan((prev) =>
        prev.map((t) =>
          t.id === editingItem.id
            ? {
                ...t,
                toothId: Number(form.toothId),
                procedure: form.procedure,
                value: Number(form.value),
                sessions: Number(form.sessions),
                notes: form.notes,
              }
            : t,
        ),
      );
    } else {
      setPlan((prev) => [
        ...prev,
        {
          id: Date.now(),
          toothId: Number(form.toothId),
          procedure: form.procedure,
          status: "pendente",
          value: Number(form.value),
          sessions: Number(form.sessions),
          completedSessions: 0,
          notes: form.notes,
        },
      ]);
    }
    setShowForm(false);
    setEditingItem(null);
    setForm({
      toothId: "",
      procedure: "",
      value: "",
      sessions: "1",
      notes: "",
    });
  };

  const handleEdit = (item: TreatmentItem) => {
    setEditingItem(item);
    setForm({
      toothId: String(item.toothId),
      procedure: item.procedure,
      value: String(item.value),
      sessions: String(item.sessions),
      notes: item.notes,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setPlan((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id: number, status: TreatmentItem["status"]) => {
    setPlan((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const updated = { ...t, status };
        if (status === "concluido") updated.completedSessions = t.sessions;
        if (status === "em_execucao" && t.completedSessions === 0)
          updated.completedSessions = 1;
        return updated;
      }),
    );
  };

  const statusColors: Record<string, string> = {
    pendente: "bg-zinc-100 text-zinc-800",
    aprovado: "bg-blue-100 text-blue-800",
    em_execucao: "bg-yellow-100 text-yellow-800",
    concluido: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">
              Valor total do plano
            </p>
            <p className="text-2xl font-bold">
              R$ {totalValue.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Recebido</p>
            <p className="text-2xl font-bold text-green-600">
              R$ {paidValue.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Em aberto</p>
            <p className="text-2xl font-bold text-orange-500">
              R$ {pendingValue.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {plan.length} procedimentos
        </p>
        <Button
          onClick={() => {
            setEditingItem(null);
            setForm({
              toothId: "",
              procedure: "",
              value: "",
              sessions: "1",
              notes: "",
            });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Novo procedimento
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {editingItem ? "Editar procedimento" : "Novo procedimento"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Dente</label>
                <select
                  value={form.toothId}
                  onChange={(e) =>
                    setForm({ ...form, toothId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {Array.from({ length: 32 }, (_, i) => {
                    const id =
                      i < 8
                        ? 18 - i
                        : i < 16
                          ? i - 7
                          : i < 24
                            ? 31 + (i - 16)
                            : 48 - (i - 24);
                    return (
                      <option key={id} value={id}>
                        Dente {id}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Valor (R$)</label>
                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Procedimento</label>
                <input
                  type="text"
                  value={form.procedure}
                  onChange={(e) =>
                    setForm({ ...form, procedure: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Ex: Restauração em resina"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Sessões previstas</label>
                <input
                  type="number"
                  value={form.sessions}
                  onChange={(e) =>
                    setForm({ ...form, sessions: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  min="1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Observacoes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!form.toothId || !form.procedure}
              >
                <Save className="mr-2 size-4" />{" "}
                {editingItem ? "Salvar" : "Adicionar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {plan.map((item) => {
          const record = toothRecords.find((r) => r.toothId === item.toothId);
          return (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex size-10 items-center justify-center rounded-lg text-sm font-bold text-white ${record ? conditionColors[record.condition] : "bg-green-500"}`}
                    >
                      {item.toothId}
                    </div>
                    <div>
                      <p className="font-medium">{item.procedure}</p>
                      <p className="text-muted-foreground text-sm">
                        Sessoes: {item.completedSessions}/{item.sessions} | R${" "}
                        {item.value.toLocaleString("pt-BR")}
                      </p>
                      {item.notes && (
                        <p className="text-muted-foreground mt-0.5 text-xs">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[item.status]}>
                      {item.status.replace("_", " ")}
                    </Badge>
                    {item.status !== "concluido" && (
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            e.target.value as TreatmentItem["status"],
                          )
                        }
                        className="bg-muted rounded border px-2 py-1 text-xs"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="aprovado">Aprovado</option>
                        <option value="em_execucao">Em execucao</option>
                        <option value="concluido">Concluido</option>
                      </select>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="size-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LembretesModule (Interactive)
// ---------------------------------------------------------------------------

function LembretesModule({
  lembretes,
  setLembretes,
  patients,
}: {
  lembretes: Lembrete[];
  setLembretes: React.Dispatch<React.SetStateAction<Lembrete[]>>;
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientId: "",
    type: "retorno",
    date: "",
    time: "09:00",
    message: "",
    channel: "whatsapp" as Lembrete["channel"],
  });

  const handleSave = () => {
    const patient = patients.find((p) => p.id === Number(form.patientId));
    if (!patient) return;
    setLembretes((prev) => [
      ...prev,
      {
        id: Date.now(),
        patientId: patient.id,
        patientName: patient.name,
        type: form.type,
        date: form.date,
        time: form.time,
        message: form.message,
        status: "pendente",
        channel: form.channel,
      },
    ]);
    setShowForm(false);
    setForm({
      patientId: "",
      type: "retorno",
      date: "",
      time: "09:00",
      message: "",
      channel: "whatsapp",
    });
  };

  const handleSend = (id: number) => {
    setLembretes((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "enviado" as const } : l)),
    );
  };

  const handleConfirm = (id: number) => {
    setLembretes((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "confirmado" as const } : l,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setLembretes((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Hoje</p>
            <p className="text-2xl font-bold">
              {lembretes.filter((l) => l.date === "2026-08-05").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-orange-500">
              {lembretes.filter((l) => l.status === "pendente").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Enviados</p>
            <p className="text-2xl font-bold text-blue-500">
              {lembretes.filter((l) => l.status === "enviado").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Confirmados</p>
            <p className="text-2xl font-bold text-green-600">
              {lembretes.filter((l) => l.status === "confirmado").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {lembretes.length} lembretes
        </p>
        <Button
          onClick={() => {
            setForm({
              patientId: "",
              type: "retorno",
              date: "",
              time: "09:00",
              message: "",
              channel: "whatsapp",
            });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Bell className="size-4" /> Novo lembrete
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Novo lembrete</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForm(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Paciente</label>
                <select
                  value={form.patientId}
                  onChange={(e) =>
                    setForm({ ...form, patientId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {patients
                    .filter((p) => p.status === "ativo")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="retorno">Retorno</option>
                  <option value="limpeza">Limpeza</option>
                  <option value="exame">Exame</option>
                  <option value="aniversario">Aniversario</option>
                  <option value="pagamento">Pagamento</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Data</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Horario</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Mensagem</label>
                <input
                  type="text"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Canal</label>
                <select
                  value={form.channel}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      channel: e.target.value as Lembrete["channel"],
                    })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!form.patientId || !form.date || !form.message}
              >
                <Save className="mr-2 size-4" /> Criar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {lembretes
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((l) => (
            <Card key={l.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                      <Bell className="text-primary size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{l.patientName}</p>
                        <Badge variant="outline" className="text-xs">
                          {l.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {l.channel}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {l.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm">
                        {new Date(l.date + "T00:00:00").toLocaleDateString(
                          "pt-BR",
                        )}
                      </p>
                      <p className="text-muted-foreground text-xs">{l.time}</p>
                    </div>
                    <Badge
                      variant={
                        l.status === "pendente"
                          ? "secondary"
                          : l.status === "enviado"
                            ? "default"
                            : "outline"
                      }
                    >
                      {l.status}
                    </Badge>
                    {l.status === "pendente" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => handleSend(l.id)}
                      >
                        <Send className="size-3" /> Enviar
                      </Button>
                    )}
                    {l.status === "enviado" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-green-600"
                        onClick={() => handleConfirm(l.id)}
                      >
                        <Check className="size-3" /> Confirmado
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(l.id)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teleconsulta Module
// ---------------------------------------------------------------------------

function TeleconsultaModule() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative flex h-80 items-center justify-center rounded-xl bg-zinc-900">
              <Video className="size-16 text-zinc-600" />
              <p className="absolute bottom-4 left-4 text-sm text-zinc-500">
                Video da consulta
              </p>
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white">AO VIVO</Badge>
              </div>
              <div className="absolute right-4 bottom-4 text-right text-white">
                <p className="text-sm font-medium">Maria Silva</p>
                <p className="text-xs text-zinc-400">Consulta de retorno</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dr. Ricardo - Consulta online</p>
                  <p className="text-muted-foreground text-sm">
                    05/08/2026 - 09:00
                  </p>
                </div>
                <p className="text-xl font-bold tabular-nums">00:15:32</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <span className="size-3 rounded-full bg-red-500" /> Mudo
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  Camera on
                </Button>
                <Button variant="destructive" size="sm" className="gap-1">
                  <Phone className="size-3" /> Encerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Prontuário da consulta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Paciente: Maria Silva</p>
                <p className="text-muted-foreground text-xs">
                  CPF: 123.456.789-00 | Idade: 41 anos
                </p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground text-xs">
                  Ultimo retorno: 01/08/2026
                </p>
                <p className="text-muted-foreground text-xs">
                  CID: M54.5 - Dor lombar
                </p>
              </div>
              <div className="border-t pt-3">
                <p className="mb-1 text-xs font-medium">Notas rapidas</p>
                <textarea
                  className="bg-muted w-full rounded border px-2 py-1.5 text-xs"
                  rows={3}
                  placeholder="Observacoes durante a consulta..."
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2 w-full gap-1"
                >
                  <Video className="size-3" /> Iniciar gravacao
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500 text-white">Conectado</Badge>
                <Badge className="bg-red-500 text-white">Gravando</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Documentos Module
// ---------------------------------------------------------------------------

function DocumentosModule() {
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);

  const documentTypes = [
    {
      id: "prescricao",
      title: "Prescrição Digital",
      description: "Receita médica para impressão",
      icon: FileText,
    },
    {
      id: "consentimento",
      title: "Termo de Consentimento",
      description: "Termo de ciencia para procedimento",
      icon: FileCheck,
    },
    {
      id: "atestado",
      title: "Atestado Médico",
      description: "Declaração de saúde para afastamento",
      icon: Stethoscope,
    },
    {
      id: "declaracao",
      title: "Declaração",
      description: "Declaração de comparecimento ou saúde",
      icon: FileText,
    },
  ];

  const generatedDocs = [
    {
      id: 1,
      type: "Prescrição Digital",
      patient: "Maria Silva",
      date: "05/08/2026",
      status: "assinado",
    },
    {
      id: 2,
      type: "Atestado Médico",
      patient: "Joao Santos",
      date: "03/08/2026",
      status: "assinado",
    },
    {
      id: 3,
      type: "Termo de Consentimento",
      patient: "Ana Costa",
      date: "01/08/2026",
      status: "assinado",
    },
  ];

  return (
    <div className="space-y-6">
      {generatingDoc ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                {generatingDoc === "prescricao" && "Prescrição Digital"}
                {generatingDoc === "consentimento" && "Termo de Consentimento"}
                {generatingDoc === "atestado" && "Atestado Médico"}
                {generatingDoc === "declaracao" && "Declaração"}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setGeneratingDoc(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 rounded-lg border-2 border-dashed p-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                  <Stethoscope className="text-primary size-5" />
                </div>
                <div>
                  <p className="font-semibold">Clinica Saude+</p>
                  <p className="text-muted-foreground text-xs">
                    CNPJ: 12.345.678/0001-00
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Paciente</p>
                  <p className="font-medium">Maria Silva</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Data</p>
                  <p className="font-medium">05/08/2026</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm">
                  Ibuprofeno 600mg - 8/8h por 7 dias. Repouso relativo por 3
                  dias.
                </p>
              </div>
              <div className="border-t pt-3">
                <div className="bg-muted flex items-center justify-center rounded p-4">
                  <div className="text-center">
                    <p className="border-foreground/40 border-b px-8 pb-1 text-sm italic">
                      Dr. Ricardo A. Medico
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Assinado digitalmente
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-green-600">
                  <CheckCircle2 className="size-3" />
                  <span className="text-xs font-medium">
                    Assinatura digital validada
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="gap-1">
                <FileText className="size-3" /> Baixar PDF
              </Button>
              <Button size="sm" variant="outline" className="gap-1">
                <Send className="size-3" /> Enviar por WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {documentTypes.map((doc) => (
              <Card
                key={doc.id}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setGeneratingDoc(doc.id)}
              >
                <CardContent className="space-y-2 p-4 text-center">
                  <doc.icon className="text-primary mx-auto size-8" />
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {doc.description}
                  </p>
                  <Button size="sm" className="w-full">
                    Gerar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                Documentos gerados recentemente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {generatedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck className="text-muted-foreground size-4" />
                      <div>
                        <p className="text-sm font-medium">{doc.type}</p>
                        <p className="text-muted-foreground text-xs">
                          {doc.patient} - {doc.date}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Assinado
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Orcamentos Module
// ---------------------------------------------------------------------------

function OrcamentosModule({
  orcamentos,
  setOrcamentos,
  patients,
}: {
  orcamentos: Orcamento[];
  setOrcamentos: React.Dispatch<React.SetStateAction<Orcamento[]>>;
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    patientId: "",
    procedures: "",
    totalValue: "",
    validUntil: "",
    notes: "",
  });

  const totalValue = orcamentos.reduce((s, o) => s + o.totalValue, 0);
  const pendentes = orcamentos.filter((o) => o.status === "pendente").length;
  const aprovados = orcamentos.filter((o) => o.status === "aprovado").length;

  const handleSave = () => {
    const patient = patients.find((p) => p.id === Number(form.patientId));
    if (!patient) return;
    setOrcamentos((prev) => [
      ...prev,
      {
        id: Date.now(),
        patientId: patient.id,
        patientName: patient.name,
        procedures: form.procedures
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        totalValue: Number(form.totalValue),
        validUntil: form.validUntil,
        status: "pendente" as const,
        notes: form.notes,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowForm(false);
    setForm({
      patientId: "",
      procedures: "",
      totalValue: "",
      validUntil: "",
      notes: "",
    });
  };

  const handleStatus = (id: number, status: "aprovado" | "rejeitado") => {
    setOrcamentos((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    );
  };

  const handleDelete = (id: number) => {
    setOrcamentos((prev) => prev.filter((o) => o.id !== id));
  };

  const statusColor: Record<string, string> = {
    pendente: "bg-orange-100 text-orange-700",
    aprovado: "bg-green-100 text-green-700",
    rejeitado: "bg-red-100 text-red-700",
    expirado: "bg-zinc-100 text-zinc-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total</p>
            <p className="text-2xl font-bold">{orcamentos.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-orange-500">{pendentes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Aprovados</p>
            <p className="text-2xl font-bold text-green-600">{aprovados}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Valor total</p>
            <p className="text-2xl font-bold">
              R$ {totalValue.toLocaleString("pt-BR")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {orcamentos.length} orcamentos
        </p>
        <Button
          onClick={() => {
            setForm({
              patientId: "",
              procedures: "",
              totalValue: "",
              validUntil: "",
              notes: "",
            });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Novo orcamento
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Novo orcamento</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForm(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Paciente</label>
                <select
                  value={form.patientId}
                  onChange={(e) =>
                    setForm({ ...form, patientId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {patients
                    .filter((p) => p.status === "ativo")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Valor (R$)</label>
                <input
                  type="number"
                  value={form.totalValue}
                  onChange={(e) =>
                    setForm({ ...form, totalValue: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">
                  Procedimentos (separados por virgula)
                </label>
                <input
                  type="text"
                  value={form.procedures}
                  onChange={(e) =>
                    setForm({ ...form, procedures: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Limpeza, Restauracao, Clareamento"
                />
              </div>
              <div>
                <label className="text-sm font-medium">
                  Validade do orcamento
                </label>
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={(e) =>
                    setForm({ ...form, validUntil: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Observacoes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={
                  !form.patientId ||
                  !form.procedures ||
                  !form.totalValue ||
                  !form.validUntil
                }
              >
                <Save className="mr-2 size-4" /> Criar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {orcamentos.map((o) => (
          <Card key={o.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{o.patientName}</p>
                    <Badge className={statusColor[o.status]}>{o.status}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {o.procedures.map((proc, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {proc}
                      </Badge>
                    ))}
                  </div>
                  {o.notes && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      {o.notes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      R$ {o.totalValue.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Valido ate{" "}
                      {new Date(o.validUntil + "T00:00:00").toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                  {o.status === "pendente" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-green-600"
                        onClick={() => handleStatus(o.id, "aprovado")}
                      >
                        <Check className="size-3" /> Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1 text-red-600"
                        onClick={() => handleStatus(o.id, "rejeitado")}
                      >
                        <X className="size-3" /> Rejeitar
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(o.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Usuarios Module
// ---------------------------------------------------------------------------

function UsuariosModule({
  usuarios,
  setUsuarios,
}: {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "dentista" as Usuario["role"],
  });

  const total = usuarios.length;
  const ativos = usuarios.filter((u) => u.status === "ativo").length;
  const dentistas = usuarios.filter((u) => u.role === "dentista").length;
  const secretarias = usuarios.filter((u) => u.role === "secretaria").length;

  const handleSave = () => {
    if (!form.name || !form.email) return;
    setUsuarios((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: form.role,
        status: "ativo" as const,
        lastAccess: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowForm(false);
    setForm({ name: "", email: "", role: "dentista" });
  };

  const toggleStatus = (id: number) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ativo" ? "inativo" : "ativo" }
          : u,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  const roleColor: Record<string, string> = {
    dentista: "bg-blue-100 text-blue-700",
    medico: "bg-purple-100 text-purple-700",
    secretaria: "bg-pink-100 text-pink-700",
    admin: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total</p>
            <p className="text-2xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Ativos</p>
            <p className="text-2xl font-bold text-green-600">{ativos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Dentistas</p>
            <p className="text-2xl font-bold text-blue-600">{dentistas}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Secretarias</p>
            <p className="text-2xl font-bold text-pink-600">{secretarias}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {usuarios.length} usuarios
        </p>
        <Button
          onClick={() => {
            setForm({ name: "", email: "", role: "dentista" });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <UserPlus className="size-4" /> Novo usuario
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Novo usuario</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForm(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="email@clinica.com.br"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Funcao</label>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value as Usuario["role"],
                    })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="dentista">Dentista</option>
                  <option value="medico">Medico</option>
                  <option value="secretaria">Secretaria</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={handleSave} disabled={!form.name || !form.email}>
                <Save className="mr-2 size-4" /> Criar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {usuarios.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                    <Users className="text-primary size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{u.name}</p>
                      <Badge className={roleColor[u.role]}>{u.role}</Badge>
                      <Badge
                        variant={u.status === "ativo" ? "default" : "secondary"}
                      >
                        {u.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {u.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm">Ultimo acesso</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(u.lastAccess + "T00:00:00").toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className={
                      u.status === "ativo"
                        ? "text-orange-600"
                        : "text-green-600"
                    }
                    onClick={() => toggleStatus(u.id)}
                  >
                    {u.status === "ativo" ? "Desativar" : "Ativar"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(u.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exames Module
// ---------------------------------------------------------------------------

function ExamesModule({
  exames,
  setExames,
  patients,
}: {
  exames: Exame[];
  setExames: React.Dispatch<React.SetStateAction<Exame[]>>;
  patients: Patient[];
}) {
  const [showForm, setShowForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState<number | null>(null);
  const [resultNotes, setResultNotes] = useState("");
  const [form, setForm] = useState({
    patientId: "",
    examType: "",
    notes: "",
  });

  const total = exames.length;
  const solicitados = exames.filter((e) => e.status === "solicitado").length;
  const realizados = exames.filter((e) => e.status === "realizado").length;
  const pendentes = exames.filter((e) => e.status === "pendente").length;

  const handleSave = () => {
    const patient = patients.find((p) => p.id === Number(form.patientId));
    if (!patient) return;
    setExames((prev) => [
      ...prev,
      {
        id: Date.now(),
        patientId: patient.id,
        patientName: patient.name,
        examType: form.examType,
        requestDate: new Date().toISOString().split("T")[0],
        resultDate: null,
        status: "solicitado" as const,
        resultNotes: form.notes,
        hasFile: false,
      },
    ]);
    setShowForm(false);
    setForm({ patientId: "", examType: "", notes: "" });
  };

  const handleRegisterResult = (id: number) => {
    setExames((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              status: "realizado" as const,
              resultDate: new Date().toISOString().split("T")[0],
              resultNotes: resultNotes || e.resultNotes,
              hasFile: true,
            }
          : e,
      ),
    );
    setShowResultForm(null);
    setResultNotes("");
  };

  const handleDelete = (id: number) => {
    setExames((prev) => prev.filter((e) => e.id !== id));
  };

  const statusColor: Record<string, string> = {
    solicitado: "bg-blue-100 text-blue-700",
    em_andamento: "bg-orange-100 text-orange-700",
    realizado: "bg-green-100 text-green-700",
    pendente: "bg-zinc-100 text-zinc-700",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Total</p>
            <p className="text-2xl font-bold">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Solicitados</p>
            <p className="text-2xl font-bold text-blue-500">{solicitados}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Realizados</p>
            <p className="text-2xl font-bold text-green-600">{realizados}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-sm">Pendentes</p>
            <p className="text-2xl font-bold text-orange-500">{pendentes}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{exames.length} exames</p>
        <Button
          onClick={() => {
            setForm({ patientId: "", examType: "", notes: "" });
            setShowForm(true);
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Solicitar exame
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Solicitar exame</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForm(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Paciente</label>
                <select
                  value={form.patientId}
                  onChange={(e) =>
                    setForm({ ...form, patientId: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                >
                  <option value="">Selecionar...</option>
                  {patients
                    .filter((p) => p.status === "ativo")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tipo de exame</label>
                <input
                  type="text"
                  value={form.examType}
                  onChange={(e) =>
                    setForm({ ...form, examType: e.target.value })
                  }
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                  placeholder="Raio-X, Hemograma, Tomografia..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Observacoes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleSave}
                disabled={!form.patientId || !form.examType}
              >
                <Save className="mr-2 size-4" /> Solicitar
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showResultForm !== null && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Registrar resultado</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowResultForm(null);
                  setResultNotes("");
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm font-medium">Resultado do exame</label>
              <textarea
                value={resultNotes}
                onChange={(e) => setResultNotes(e.target.value)}
                className="bg-muted mt-1 w-full rounded border px-3 py-2 text-sm"
                rows={3}
                placeholder="Descreva o resultado do exame..."
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => handleRegisterResult(showResultForm)}>
                <Save className="mr-2 size-4" /> Registrar resultado
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResultForm(null);
                  setResultNotes("");
                }}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {exames.map((e) => (
          <Card key={e.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                    <FileCheck className="text-primary size-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{e.patientName}</p>
                      <Badge className={statusColor[e.status]}>
                        {e.status.replace("_", " ")}
                      </Badge>
                      {e.hasFile && (
                        <Badge variant="outline" className="text-xs">
                          Arquivo
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {e.examType}
                    </p>
                    {e.resultNotes && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        {e.resultNotes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm">
                      Solicitado:{" "}
                      {new Date(e.requestDate + "T00:00:00").toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                    {e.resultDate && (
                      <p className="text-muted-foreground text-xs">
                        Resultado:{" "}
                        {new Date(
                          e.resultDate + "T00:00:00",
                        ).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  {(e.status === "solicitado" ||
                    e.status === "em_andamento") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => {
                        setResultNotes(e.resultNotes);
                        setShowResultForm(e.id);
                      }}
                    >
                      <Edit className="size-3" /> Registrar resultado
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(e.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
