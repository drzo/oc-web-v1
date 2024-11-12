export class Tournament {
  private participants: string[] = [];

  addParticipant(participant: string): void {
    this.participants.push(participant);
  }

  removeParticipant(participant: string): void {
    const index = this.participants.indexOf(participant);
    if (index !== -1) {
      this.participants.splice(index, 1);
    }
  }

  generateRandomPairings(): Array<[string, string]> {
    const shuffled = [...this.participants].sort(() => Math.random() - 0.5);
    const pairs: Array<[string, string]> = [];
    
    for (let i = 0; i < shuffled.length - 1; i += 2) {
      pairs.push([shuffled[i], shuffled[i + 1]]);
    }

    if (shuffled.length % 2 !== 0) {
      // Handle bye (odd number of participants)
      pairs.push([shuffled[shuffled.length - 1], 'BYE']);
    }

    return pairs;
  }

  getParticipants(): string[] {
    return [...this.participants];
  }
}