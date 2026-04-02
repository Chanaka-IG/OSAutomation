import fs from 'fs';
import path from 'path';

const STATE_FILE_PATH = path.resolve(__dirname, '../../../.test-state.json');

type State = {
    [suiteId: string]: {
        prerequisitesAdded?: boolean;
    };
};

export class TestStateManager {


    private static loadState(): State {
        if (!fs.existsSync(STATE_FILE_PATH)) {
            return {};
        }

        try {
            const raw = fs.readFileSync(STATE_FILE_PATH, 'utf-8');
            return JSON.parse(raw || '{}');
        } catch {
            return {};
        }
    }

    private static saveAllState(state: State) {
        fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(state, null, 2));
    }

    static getState(suiteId: string) {
        const state = this.loadState();
        return state[suiteId] || {};
    }

    static saveState(suiteId: string, suiteState: any) {
        const state = this.loadState();
        state[suiteId] = suiteState;
        this.saveAllState(state);
    }

    static clearState() {
        if (fs.existsSync(STATE_FILE_PATH)) {
            fs.unlinkSync(STATE_FILE_PATH);
        }
    }
    
}