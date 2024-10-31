import React, { useState } from 'react';
import { Shuffle, UserPlus, RotateCcw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const CharacterPicker = () => {
  const [participants, setParticipants] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [showResult, setShowResult] = useState(false);

  const characters = [
    {
      name: "Roztargniony Profesor",
      traits: "Gubi rzeczy, cytuje nieistniejące badania",
      goal: "Znaleźć swoje okulary (które ma na głowie)"
    },
    {
      name: "Energiczna Instruktorka Fitness",
      traits: "Nadmiernie entuzjastyczna, wszystko jest ćwiczeniem",
      goal: "Zorganizować trening grupowy w najmniej odpowiednim momencie"
    },
    {
      name: "Początkujący Magik",
      traits: "Pełen nadziei, ale nieudolny",
      goal: "Zaimponować publiczności trików, które nigdy nie wychodzą"
    },
    {
      name: "Ekscentryczna Artystka",
      traits: "Widzi sztukę wszędzie, bardzo dramatyczna",
      goal: "Stworzyć arcydzieło z przypadkowych przedmiotów"
    },
    {
      name: "Lokalny Plotkarz",
      traits: "Wszędobylski, przekręca fakty",
      goal: "Odkryć 'sensacyjną' tajemnicę"
    },
    {
      name: "Emerytowany Detektyw",
      traits: "Podejrzliwy, widzi spiski",
      goal: "Rozwiązać nieistniejącą zagadkę"
    },
    {
      name: "Niedoszła Gwiazda Popu",
      traits: "Śpiewa zamiast mówić, żyje przeszłą chwałą",
      goal: "Przekonać wszystkich do wzięcia udziału w jej comebacku"
    }
  ];

  const addParticipant = () => {
    const name = prompt("Podaj imię uczestnika:");
    if (name && name.trim()) {
      setParticipants([...participants, name.trim()]);
    }
  };

  const assignCharacters = () => {
    const shuffledCharacters = [...characters]
      .sort(() => Math.random() - 0.5)
      .slice(0, participants.length);
    
    const newAssignments = {};
    participants.forEach((participant, index) => {
      newAssignments[participant] = shuffledCharacters[index];
    });
    
    setAssignments(newAssignments);
    setShowResult(true);
  };

  const reset = () => {
    setParticipants([]);
    setAssignments({});
    setShowResult(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Maszyna Losująca Postaci Teatralnych</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center space-x-4">
            <Button onClick={addParticipant}>
              <UserPlus className="mr-2 h-4 w-4" />
              Dodaj Uczestnika
            </Button>
            <Button onClick={assignCharacters} disabled={participants.length === 0}>
              <Shuffle className="mr-2 h-4 w-4" />
              Losuj Postaci
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {participants.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Lista uczestników:</h3>
              <ul className="list-disc pl-5">
                {participants.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))}
              </ul>
            </div>
          )}

          {showResult && Object.keys(assignments).length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Przydzielone postaci:</h3>
              {Object.entries(assignments).map(([participant, character], index) => (
                <Alert key={index}>
                  <AlertTitle>{participant} jako {character.name}</AlertTitle>
                  <AlertDescription>
                    <p><strong>Cechy:</strong> {character.traits}</p>
                    <p><strong>Cel:</strong> {character.goal}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterPicker;
