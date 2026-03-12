import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Inbox, Loader2, Lock, Mail, RefreshCw, Users } from "lucide-react";
import { useState } from "react";

const ADMIN_PASSWORD = "omnisphere@2026";

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

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

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Galat password! Dobara try karo.");
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
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Newsletter <span className="text-primary">Subscribers</span>
          </h1>
          <p className="text-white/60 text-sm">
            Sabhi newsletter subscribers ki list — OmniSphere Admin
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Stats + Refresh row */}
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

            <div className="flex gap-2">
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
          </div>

          {/* Loading State */}
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

          {/* Empty State */}
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

          {/* Subscribers Table */}
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
        </div>
      </section>
    </main>
  );
}
