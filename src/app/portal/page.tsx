"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  FileText,
  Heart,
  LogOut,
  Pill,
  Plus,
  ChevronDown,
  ChevronUp,
  Download,
  Stethoscope,
  Activity,
  Weight,
  Ruler,
  TrendingUp,
} from "lucide-react";

const upcomingAppointments = [
  {
    id: 1,
    date: "15/08/2026",
    time: "10:00",
    doctor: "Dr. Joao Santos",
    service: "Consulta",
    status: "confirmado",
  },
  {
    id: 2,
    date: "22/08/2026",
    time: "14:00",
    doctor: "Dra. Ana Costa",
    service: "Retorno",
    status: "pendente",
  },
];

const pastAppointments = [
  {
    id: 3,
    date: "01/08/2026",
    time: "09:00",
    doctor: "Dr. Joao Santos",
    service: "Consulta",
    status: "realizado",
  },
  {
    id: 4,
    date: "20/07/2026",
    time: "15:00",
    doctor: "Dra. Maria Oliveira",
    service: "Exame",
    status: "cancelado",
  },
];

const prescriptions = [
  {
    id: 1,
    date: "01/08/2026",
    doctor: "Dr. Joao Santos",
    medications: [
      "Losartana 50mg - 1x ao dia",
      "Omeprazol 20mg - 1x ao dia antes do cafe",
    ],
    status: "ativa",
    details: "Tratamento para hipertensao arterial. Retorno em 30 dias.",
  },
  {
    id: 2,
    date: "15/06/2026",
    doctor: "Dra. Ana Costa",
    medications: ["Amoxicilina 500mg - 3x ao dia por 7 dias"],
    status: "finalizada",
    details: "Tratamento para infecao respiratoria.",
  },
];

const medicalRecords = [
  {
    id: 1,
    date: "01/08/2026",
    doctor: "Dr. Joao Santos",
    type: "Consulta",
    notes: "Paciente relata melhora dos sintomas. Pressao arterial controlada.",
    cid: "I10",
  },
  {
    id: 2,
    date: "15/06/2026",
    doctor: "Dra. Ana Costa",
    type: "Consulta",
    notes:
      "Diagnostico de infecao respiratoria superior. Prescrito antibiotico.",
    cid: "J06.9",
  },
  {
    id: 3,
    date: "20/04/2026",
    doctor: "Dr. Joao Santos",
    type: "Retorno",
    notes: "Avaliacao de rotina. Exames dentro da normalidade.",
    cid: "Z00.0",
  },
];

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<
    "consultas" | "prescricoes" | "prontuario"
  >("consultas");
  const [showForm, setShowForm] = useState(false);
  const [expandedPrescription, setExpandedPrescription] = useState<
    number | null
  >(null);
  const [formData, setFormData] = useState({ service: "", date: "", time: "" });

  const tabs = [
    { id: "consultas" as const, label: "Minhas Consultas", icon: Calendar },
    { id: "prescricoes" as const, label: "Prescricoes", icon: Pill },
    { id: "prontuario" as const, label: "Prontuario", icon: FileText },
  ];

  const handleConfirm = () => {
    alert(
      `Consulta agendada: ${formData.service} em ${formData.date} as ${formData.time}`,
    );
    setShowForm(false);
    setFormData({ service: "", date: "", time: "" });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-border bg-card border-b px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Clinica Saude+</h1>
            <p className="text-muted-foreground text-sm">
              Bem-vinda, Maria Silva
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <LogOut className="mr-2 size-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <nav className="border-border mb-8 flex gap-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTab === "consultas" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Proximas consultas</h2>
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 size-4" />
                Agendar nova consulta
              </Button>
            </div>

            {showForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Agendar consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-muted-foreground mb-1 block text-sm">
                        Tipo de consulta
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="border-border bg-input text-foreground w-full rounded-lg border px-3 py-2 text-sm"
                      >
                        <option value="">Selecione</option>
                        <option value="Consulta">Consulta</option>
                        <option value="Retorno">Retorno</option>
                        <option value="Exame">Exame</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-muted-foreground mb-1 block text-sm">
                        Data
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="border-border bg-input text-foreground w-full rounded-lg border px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground mb-1 block text-sm">
                        Horario
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="border-border bg-input text-foreground w-full rounded-lg border px-3 py-2 text-sm"
                      >
                        <option value="">Selecione</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={handleConfirm}
                      disabled={
                        !formData.service || !formData.date || !formData.time
                      }
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                        <Calendar className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {apt.service} - {apt.doctor}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {apt.date} as {apt.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        apt.status === "confirmado" ? "default" : "secondary"
                      }
                    >
                      {apt.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-lg font-semibold">Consultas anteriores</h2>
            <div className="space-y-3">
              {pastAppointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                        <Calendar className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {apt.service} - {apt.doctor}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {apt.date} as {apt.time}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        apt.status === "realizado" ? "outline" : "destructive"
                      }
                    >
                      {apt.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "prescricoes" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Minhas prescricoes</h2>
            {prescriptions.map((rx) => (
              <Card key={rx.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                        <Pill className="text-muted-foreground size-5" />
                      </div>
                      <div>
                        <p className="font-medium">{rx.doctor}</p>
                        <p className="text-muted-foreground text-sm">
                          {rx.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          rx.status === "ativa" ? "default" : "secondary"
                        }
                      >
                        {rx.status}
                      </Badge>
                      <button
                        onClick={() =>
                          setExpandedPrescription(
                            expandedPrescription === rx.id ? null : rx.id,
                          )
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {expandedPrescription === rx.id ? (
                          <ChevronUp className="size-5" />
                        ) : (
                          <ChevronDown className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedPrescription === rx.id && (
                    <div className="border-border mt-4 border-t pt-4">
                      <p className="text-muted-foreground mb-2 text-sm">
                        Medicamentos:
                      </p>
                      <ul className="mb-3 space-y-1">
                        {rx.medications.map((med, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Pill className="text-muted-foreground size-3" />
                            {med}
                          </li>
                        ))}
                      </ul>
                      <p className="text-muted-foreground mb-3 text-sm">
                        {rx.details}
                      </p>
                      <Button variant="link" size="sm" className="p-0">
                        <Download className="mr-1 size-3" />
                        Baixar PDF
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "prontuario" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="size-5" />
                  Sinais vitais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Pressao", value: "120/80 mmHg", icon: Heart },
                    { label: "Peso", value: "72 kg", icon: Weight },
                    { label: "Altura", value: "1,68 m", icon: Ruler },
                    { label: "IMC", value: "25,5", icon: TrendingUp },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-border rounded-lg border p-3"
                    >
                      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                        <item.icon className="size-4" />
                        {item.label}
                      </div>
                      <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <h2 className="text-lg font-semibold">Historico de consultas</h2>
            <div className="before:bg-border relative space-y-4 pl-6 before:absolute before:top-0 before:bottom-0 before:left-2 before:w-px">
              {medicalRecords.map((record) => (
                <div key={record.id} className="relative">
                  <div className="border-foreground bg-background absolute top-4 -left-6 size-4 rounded-full border-2" />
                  <Card>
                    <CardContent className="py-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Stethoscope className="text-muted-foreground size-4" />
                          <span className="font-medium">
                            {record.type} - {record.doctor}
                          </span>
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {record.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm">
                        {record.notes}
                      </p>
                      <Badge variant="outline">CID: {record.cid}</Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
