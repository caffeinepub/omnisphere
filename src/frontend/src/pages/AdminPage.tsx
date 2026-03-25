import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Inbox,
  Key,
  Loader2,
  Lock,
  Mail,
  Plus,
  RefreshCw,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const ADMIN_PASSWORD = "omnisphere@2026";

const DEFAULT_TOPICS = [
  "Best 5G phones under 20000 in India 2026",
  "OnePlus 13 full review Hinglish",
  "Gaming phones buying guide India",
  "Best laptops for students under 40000",
  "AI tools for Indian students 2026",
  "Top 10 budget earbuds India 2026",
  "iPhone 16 vs Samsung S25 comparison",
];

function getTopicsFromStorage(): string[] {
  try {
    const raw = localStorage.getItem("omni_topics");
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  const defaults = [...DEFAULT_TOPICS];
  localStorage.setItem("omni_topics", JSON.stringify(defaults));
  return defaults;
}

function getSchedulerEnabled(): boolean {
  return localStorage.getItem("omni_scheduler_enabled") === "true";
}

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // API Key state
  const [apiKeyMasked, setApiKeyMasked] = useState("");
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(false);

  // Auto Scheduler state
  const [schedulerEnabled, setSchedulerEnabled] = useState(getSchedulerEnabled);
  const [topicQueue, setTopicQueue] = useState<string[]>(getTopicsFromStorage);
  const [newTopic, setNewTopic] = useState("");
  const [schedulerStatus, setSchedulerStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutline, setGeneratedOutline] = useState("");

  const { actor, isFetching } = useActor();

  const {
    data: subscribers = [],
    isLoading,
    isFetching: isRefetching,
    refetch,
  } = useQuery<string[]>({
    queryKey: ["subscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getSubscribers();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const loading = isLoading || (isFetching && subscribers.length === 0);

  useEffect(() => {
    if (!isAuthenticated || !actor || isFetching) return;
    (async () => {
      try {
        const status: string = await (actor as any).getClaudeApiKeyStatus();
        setApiKeyMasked(status || "");
      } catch {
        // backend method may not exist yet
      }
    })();
  }, [isAuthenticated, actor, isFetching]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Galat password! Dobara try karo.");
    }
  }

  async function handleSaveApiKey() {
    const key = apiKeyInput.trim();
    if (!key || !actor) return;
    setApiKeyLoading(true);
    try {
      await (actor as any).setClaudeApiKey(key);
      const status: string = await (actor as any).getClaudeApiKeyStatus();
      setApiKeyMasked(status || `${key.slice(0, 12)}...`);
      setApiKeyInput("");
      setApiKeySaved(true);
      setTimeout(() => setApiKeySaved(false), 3000);
    } catch {
      setError("Key save karne mein problem aayi. Dobara try karo.");
    } finally {
      setApiKeyLoading(false);
    }
  }

  async function handleRemoveApiKey() {
    if (!actor) return;
    setApiKeyLoading(true);
    try {
      await (actor as any).setClaudeApiKey("");
      setApiKeyMasked("");
      setApiKeyInput("");
    } catch {
      // ignore
    } finally {
      setApiKeyLoading(false);
    }
  }

  function toggleScheduler(enabled: boolean) {
    setSchedulerEnabled(enabled);
    localStorage.setItem("omni_scheduler_enabled", String(enabled));
  }

  function addTopic() {
    const t = newTopic.trim();
    if (!t) return;
    const updated = [...topicQueue, t];
    setTopicQueue(updated);
    localStorage.setItem("omni_topics", JSON.stringify(updated));
    setNewTopic("");
  }

  function removeTopic(idx: number) {
    const updated = topicQueue.filter((_, i) => i !== idx);
    setTopicQueue(updated);
    localStorage.setItem("omni_topics", JSON.stringify(updated));
  }

  async function handleTestGenerate() {
    if (topicQueue.length === 0) {
      setSchedulerStatus(
        "❌ Topic queue mein koi topic nahi hai. Pehle topic add karo.",
      );
      return;
    }
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      setSchedulerStatus(
        "❌ VITE_ANTHROPIC_API_KEY env variable set nahi hai.",
      );
      return;
    }
    setIsGenerating(true);
    setGeneratedOutline("");
    setSchedulerStatus("");
    const topic = topicQueue[0];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-allow-browser": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 800,
          messages: [
            {
              role: "user",
              content: `Ek Hinglish tech article ka detailed outline banao is topic ke liye: "${topic}"\n\nOutline mein shamil karo:\n- Article title (catchy)\n- 5-6 H2 headings\n- Har heading ke neeche 2-3 bullet points\n- Meta description (160 chars)\n- Target keywords (5 keywords)\n\nHinglish mein likho (Hindi + English mix).`,
            },
          ],
        }),
      });
      const data = await res.json();
      if (data.error) {
        setSchedulerStatus(`❌ Error: ${data.error.message}`);
      } else {
        setGeneratedOutline(data.content?.[0]?.text ?? "");
        setSchedulerStatus(`✅ "${topic}" ke liye outline generate ho gaya!`);
      }
    } catch (err) {
      setSchedulerStatus(`❌ Network error: ${String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  }

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <main
        className="min-h-screen bg-background flex items-center justify-center px-4"
        data-ocid="admin.page"
      >
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
              <p className="text-sm text-muted-foreground mt-1">
                OmniSphere Admin Panel
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4"
              data-ocid="admin.login.panel"
            >
              <div>
                <Input
                  type="password"
                  placeholder="Password daalo..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                  autoFocus
                  data-ocid="admin.password.input"
                />
              </div>

              {error && (
                <p
                  className="text-sm text-destructive text-center"
                  data-ocid="admin.login.error_state"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="h-11 font-semibold"
                data-ocid="admin.login.submit_button"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // --- Admin Dashboard ---
  return (
    <main className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              Admin Panel
            </span>
            {schedulerEnabled && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                ⏰ Scheduler Active
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            OmniSphere <span className="text-primary">Admin</span>
          </h1>
          <p className="text-white/60 text-sm">
            Newsletter, API Key aur Auto Scheduler manage karo
          </p>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Top action bar */}
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAuthenticated(false)}
              className="gap-2 text-muted-foreground hover:text-destructive"
              data-ocid="admin.logout.button"
            >
              <Lock className="w-4 h-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="subscribers" data-ocid="admin.panel">
            <TabsList className="w-full mb-8 h-12 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger
                value="subscribers"
                className="flex-1 text-sm font-medium rounded-lg"
                data-ocid="admin.subscribers.tab"
              >
                📋 Subscribers
              </TabsTrigger>
              <TabsTrigger
                value="apikey"
                className="flex-1 text-sm font-medium rounded-lg"
                data-ocid="admin.apikey.tab"
              >
                🔑 API Key
              </TabsTrigger>
              <TabsTrigger
                value="scheduler"
                className="flex-1 text-sm font-medium rounded-lg"
                data-ocid="admin.scheduler.tab"
              >
                ⏰ Auto Scheduler
              </TabsTrigger>
            </TabsList>

            {/* ── Subscribers Tab ── */}
            <TabsContent value="subscribers">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Total Subscribers
                    </p>
                    <p className="text-2xl font-bold text-foreground leading-tight">
                      {loading ? (
                        <span className="inline-block w-8 h-6 bg-muted animate-pulse rounded" />
                      ) : (
                        subscribers.length
                      )}
                    </p>
                  </div>
                  {!loading && subscribers.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 text-xs"
                    >
                      Active
                    </Badge>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isRefetching || loading}
                  className="gap-2 border-border hover:border-primary/50 hover:text-primary transition-colors"
                  data-ocid="admin.refresh.button"
                >
                  {isRefetching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Refresh
                </Button>
              </div>

              {loading && (
                <div
                  className="flex flex-col items-center justify-center py-20 gap-4"
                  data-ocid="admin.loading_state"
                >
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-muted-foreground text-sm">
                    Subscribers load ho rahe hain...
                  </p>
                </div>
              )}

              {!loading && subscribers.length === 0 && (
                <div
                  className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-border rounded-2xl"
                  data-ocid="admin.empty_state"
                >
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <Inbox className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground mb-1">
                      Koi subscriber nahi mila
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Abhi tak kisi ne newsletter subscribe nahi kiya hai.
                    </p>
                  </div>
                </div>
              )}

              {!loading && subscribers.length > 0 && (
                <div
                  className="rounded-2xl border border-border overflow-hidden"
                  data-ocid="admin.subscribers.table"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead className="w-16 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          #
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Email Address
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((email, index) => (
                        <TableRow
                          key={email}
                          className="hover:bg-muted/30 transition-colors"
                          data-ocid={`admin.subscribers.row.${index + 1}`}
                        >
                          <TableCell className="text-muted-foreground text-sm font-mono">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Mail className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-foreground">
                                {email}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            {/* ── API Key Tab ── */}
            <TabsContent value="apikey">
              <div
                className="rounded-2xl border border-border bg-card p-6"
                data-ocid="admin.apikey.panel"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">
                      Claude API Key
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      OmniBot chatbot ke liye key set karo — backend mein
                      securely save hogi
                    </p>
                  </div>
                  {apiKeyMasked && (
                    <Badge className="ml-auto bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                      ✓ Key saved
                    </Badge>
                  )}
                </div>

                {apiKeyMasked ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                      <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-mono text-muted-foreground flex-1 truncate">
                        {apiKeyMasked}••••••••••••••••••••••••••••••••
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="Nai key dalkar replace karo..."
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="h-10 text-sm"
                        data-ocid="admin.apikey.input"
                      />
                      <Button
                        size="sm"
                        onClick={handleSaveApiKey}
                        disabled={!apiKeyInput.trim() || apiKeyLoading}
                        className="h-10 px-4 shrink-0"
                        data-ocid="admin.apikey.save_button"
                      >
                        {apiKeyLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Update"
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleRemoveApiKey}
                        disabled={apiKeyLoading}
                        className="h-10 px-4 shrink-0 text-destructive hover:text-destructive border-destructive/30"
                        data-ocid="admin.apikey.delete_button"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      Apni Claude API key yahan paste karo. Key backend canister
                      mein securely save hogi — kisi bhi device/domain se
                      chatbot kaam karega.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="sk-ant-api03-..."
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        className="h-11 font-mono text-sm"
                        data-ocid="admin.apikey.input"
                      />
                      <Button
                        onClick={handleSaveApiKey}
                        disabled={!apiKeyInput.trim() || apiKeyLoading}
                        className="h-11 px-5 shrink-0"
                        data-ocid="admin.apikey.save_button"
                      >
                        {apiKeyLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Save Key"
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Key milti hai:{" "}
                      <a
                        href="https://console.anthropic.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline"
                      >
                        console.anthropic.com
                      </a>
                    </p>
                  </div>
                )}

                {apiKeySaved && (
                  <div
                    className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
                    data-ocid="admin.apikey.success_state"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                      API key successfully save ho gayi! OmniBot ab kisi bhi
                      device par kaam karega.
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ── Auto Scheduler Tab ── */}
            <TabsContent value="scheduler">
              <div className="flex flex-col gap-6">
                {/* Enable/Disable Toggle */}
                <div
                  className="rounded-2xl border border-border bg-card p-6"
                  data-ocid="admin.scheduler.panel"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-foreground">
                        Daily Auto-Publish
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scheduler active hone par roz pehle topic queue se
                        article generate hoga aur website par publish hoga.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {schedulerEnabled && (
                        <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-xs">
                          🟢 Scheduler Active
                        </Badge>
                      )}
                      <Switch
                        checked={schedulerEnabled}
                        onCheckedChange={toggleScheduler}
                        data-ocid="admin.scheduler.toggle"
                      />
                    </div>
                  </div>
                </div>

                {/* Topic Queue */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    📝 Topic Queue
                    <Badge variant="secondary" className="text-xs">
                      {topicQueue.length} topics
                    </Badge>
                  </h3>

                  {/* Add Topic */}
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Naya topic daalo..."
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTopic()}
                      className="h-10 text-sm"
                      data-ocid="admin.scheduler.input"
                    />
                    <Button
                      size="sm"
                      onClick={addTopic}
                      disabled={!newTopic.trim()}
                      className="h-10 px-4 shrink-0 gap-1.5"
                      data-ocid="admin.scheduler.button"
                    >
                      <Plus className="w-4 h-4" /> Add Topic
                    </Button>
                  </div>

                  {/* Topic chips */}
                  {topicQueue.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Koi topic nahi hai. Upar se add karo.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {topicQueue.map((topic, idx) => (
                        <div
                          key={topic}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 bg-muted/40 rounded-xl border border-border"
                          data-ocid={`admin.scheduler.item.${idx + 1}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xs text-muted-foreground font-mono w-5 shrink-0">
                              {idx + 1}.
                            </span>
                            {idx === 0 && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5 py-0 shrink-0">
                                Next
                              </Badge>
                            )}
                            <span className="text-sm text-foreground truncate">
                              {topic}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeTopic(idx)}
                            className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
                            data-ocid={`admin.scheduler.delete_button.${idx + 1}`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Test Generate */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    🚀 Test Karo
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Queue ke pehle topic ke liye Hinglish article outline
                    generate karo — Claude API use hogi.
                  </p>

                  <Button
                    onClick={handleTestGenerate}
                    disabled={isGenerating || topicQueue.length === 0}
                    className="gap-2 w-full sm:w-auto"
                    data-ocid="admin.scheduler.primary_button"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "🚀 Abhi Test Karo"
                    )}
                  </Button>

                  {isGenerating && (
                    <div
                      className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20"
                      data-ocid="admin.scheduler.loading_state"
                    >
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <span className="text-sm text-muted-foreground">
                        Claude se outline generate ho raha hai...
                      </span>
                    </div>
                  )}

                  {schedulerStatus && (
                    <p
                      className={`mt-3 text-sm font-medium ${
                        schedulerStatus.startsWith("✅")
                          ? "text-green-600"
                          : "text-destructive"
                      }`}
                      data-ocid="admin.scheduler.success_state"
                    >
                      {schedulerStatus}
                    </p>
                  )}

                  {generatedOutline && (
                    <div className="mt-4">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">
                        Generated Outline:
                      </Label>
                      <pre className="text-xs text-foreground bg-muted/50 border border-border rounded-xl p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {generatedOutline}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
