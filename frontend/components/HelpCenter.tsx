'use client'
import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Logo } from "@/components/icons/logo"

interface CardData {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface RequestData {
  title: string;
  description: string;
}

const HelpCenter: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [requestTitle, setRequestTitle] = useState<string>('');
  const [requestDescription, setRequestDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`);
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      const data: CardData[] = await response.json();
      setCards(data);
    } catch (error) {
      setError('Error fetching cards. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to load help center content.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
  if (!searchTerm.trim()) {
    fetchCards();
    return;
  }

  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${searchTerm}`);
    if (!response.ok) {
      if (response.status === 404) {
        setCards([]);
        toast({
          title: "No results",
          description: "No matching cards found.",
        });
        return;
      }
      throw new Error('Search failed');
    }
    const data: CardData[] = await response.json();
    setCards(data);
  } catch (error) {
    setError('Error searching cards. Please try again.');
    toast({
      title: "Error",
      description: "Search operation failed.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      fetchCards();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const resetForm = () => {
    setRequestTitle('');
    setRequestDescription('');
    setFormError(null);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: requestTitle,
          description: requestDescription,
        } as RequestData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setFormError(data.message);
          return;
        }
        throw new Error(data.message || 'Failed to submit request');
      }

      toast({
        title: "Success",
        description: "Your request has been submitted successfully.",
      });
      setIsModalOpen(false);
      resetForm();
      fetchCards(); 
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Logo className="h-8 w-auto" /> 
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Abstract | Help Center</h1>
      </div>
      <Button onClick={() => setIsModalOpen(true)}>Submit a request</Button>
    </div>
  </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-light-purple p-8 rounded-lg mb-12">
    <h2 className="text-4xl font-bold text-center mb-8">How can we help?</h2>
    <div className="flex justify-center">
      <div className="relative w-full max-w-xl">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="pr-10 bg-white" 
          aria-label="Search help topics"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-0 top-0 bottom-0"
          aria-label="Perform search"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <Card key={card._id}>
                <CardHeader>{card.title}</CardHeader>
                <CardContent>{card.description}</CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && cards.length === 0 && (
          <Alert>
            <AlertDescription>No results found. Try a different search term.</AlertDescription>
          </Alert>
        )}
      </main>

      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit a Request</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitRequest}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="requestTitle">Title</Label>
                <Input
                  id="requestTitle"
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                  required
                  className={formError ? "border-red-500" : ""}
                />
                {formError && (
                  <p className="text-red-500 text-sm mt-1">{formError}</p>
                )}
              </div>
              <div>
                <Label htmlFor="requestDescription">Description</Label>
                <Textarea
                  id="requestDescription"
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpCenter;
