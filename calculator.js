class CalculatorEngine {
    constructor() {
        // Default values based on initial conditions
        this.defaultValues = {
            "Fraud Detection": 16,
            "M&A Analysis": 5,
            "Financial Health": 4,
            "Compliance Analysis": 8,
            "Benchmarking": 3,
            "Corporate Vulnerabilities": 6,
            "Management & Governance": 5,
            "Legal & Litigation Review": 7,
            "Regulatory Compliance Review": 7,
            "Segment Reporting Analysis": 7,
            "Earnings Quality & Impact Analysis": 8,
            "Material Contract Review": 5,
        };

        this.selectedType = 'Fraud Detection';
        this.hours = this.defaultValues[this.selectedType]; // Start with default value
        this.enabledFeatures = new Set(['Red Flag Detection', 'Hidden Risks Identification', 'Cross-Document Analysis']);

        // Analysis conditions for each analysis time
        this.analysisConditions = {
            time1: { mustBe: ['Fraud Detection'], mustNotBe: ['M&A Analysis'], baseMultiplier: 1 },
            time2: { mustBe: ['M&A Analysis', 'Financial Health'], mustNotBe: ['Compliance Analysis'], baseMultiplier: 1 },
            time3: { mustBe: ['Financial Health', 'Benchmarking'], mustNotBe: ['Fraud Detection'], baseMultiplier: 1 },
            time4: { mustBe: ['Compliance Analysis', 'Corporate Vulnerabilities'], mustNotBe: ['M&A Analysis'], baseMultiplier: 1 },
            time5: { mustBe: ['Benchmarking', 'Management & Governance'], mustNotBe: ['Financial Health'], baseMultiplier: 1 },
            time6: { mustBe: ['Corporate Vulnerabilities', 'Legal & Litigation Review'], mustNotBe: ['Compliance Analysis'], baseMultiplier: 1 },
            time7: { mustBe: ['Management & Governance', 'Regulatory Compliance Review'], mustNotBe: ['Benchmarking'], baseMultiplier: 1 },
            time8: { mustBe: ['Legal & Litigation Review', 'Segment Reporting Analysis'], mustNotBe: ['Corporate Vulnerabilities'], baseMultiplier: 1 },
            time9: { mustBe: ['Regulatory Compliance Review', 'Earnings Quality & Impact Analysis'], mustNotBe: ['Management & Governance'], baseMultiplier: 1 },
            time10: { mustBe: ['Segment Reporting Analysis', 'Material Contract Review'], mustNotBe: ['Legal & Litigation Review'], baseMultiplier: 1 },
            time11: { mustBe: ['Earnings Quality & Impact Analysis'], mustNotBe: ['Regulatory Compliance Review'], baseMultiplier: 1 },
            time12: { mustBe: ['Material Contract Review'], mustNotBe: ['Segment Reporting Analysis'], baseMultiplier: 1 }
        };

        // Feature configuration with base values and multipliers
        this.FEATURES = {
            'Red Flag Detection': { baseValue: 3, multiplier: 1 },
            'Hidden Risks Identification': { baseValue: 2, multiplier: 1 },
            'Cross-Document Analysis': { baseValue: 5, multiplier: 1 },
            'Data Consistency': { baseValue: 3, multiplier: 1 }
        };

        // Initialize after DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        try {
            this.timeNumber = document.getElementById('timeNumber');
            this.timeRange = document.getElementById('timeRange');
            this.analysisTypeSelect = document.querySelector('.form-select');
            this.checkboxes = document.querySelectorAll('.checkbox-input');
            this.hoursResultElement = document.querySelector('.hours-saved');
            this.secondsResultElement = document.querySelector('.seconds');

            this.setupEventListeners();
            this.calculate();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupEventListeners() {
        let calculateTimeout;
        const debouncedCalculate = () => {
            clearTimeout(calculateTimeout);
            calculateTimeout = setTimeout(() => this.calculate(), 100);
        };

        this.timeRange.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeNumber.value = value;
                this.hours = value; // Use slider value
                debouncedCalculate();
            } catch (error) {
                console.error('Range input error:', error);
            }
        });

        this.timeNumber.addEventListener('input', (e) => {
            try {
                const value = this.validateTimeValue(e.target.value);
                this.timeRange.value = value;
                this.hours = value; // Use number input value
                debouncedCalculate();
            } catch (error) {
                console.error('Number input error:', error);
            }
        });

        this.analysisTypeSelect.addEventListener('change', (e) => {
            try {
                this.selectedType = e.target.value;
                this.hours = this.defaultValues[this.selectedType]; // Reset hours to default value
                this.calculate();
            } catch (error) {
                console.error('Analysis type selection error:', error);
            }
        });

        this.checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                try {
                    const label = e.target.closest('.checkbox-label');
                    const featureName = label.textContent.trim();
                    if (e.target.checked) {
                        this.enabledFeatures.add(featureName);
                    } else {
                        this.enabledFeatures.delete(featureName);
                    }
                    this.calculate();
                } catch (error) {
                    console.error('Checkbox handling error:', error);
                }
            });
        });
    }

    checkConditions(timeKey) {
        const conditions = this.analysisConditions[timeKey];
        const mustBeCondition = conditions.mustBe.includes(this.selectedType);
        const mustNotBeCondition = !conditions.mustNotBe.includes(this.selectedType);

        return {
            conditionsMet: mustBeCondition && mustNotBeCondition,
            multiplier: conditions.baseMultiplier
        };
    }

    calculateFeatureValues() {
        let baseSum = 0;
        let multiplierSum = 0;

        for (const feature of this.enabledFeatures) {
            if (this.FEATURES[feature]) {
                baseSum += this.FEATURES[feature].baseValue;
                multiplierSum += this.FEATURES[feature].multiplier;
            }
        }

        return { baseSum, multiplierSum };
    }

    calculate() {
        try {
            const { baseSum, multiplierSum } = this.calculateFeatureValues();
            let timeBasedTotal = 0;

            Object.keys(this.analysisConditions).forEach(timeKey => {
                const result = this.checkConditions(timeKey);
                if (result.conditionsMet) {
                    timeBasedTotal += this.hours * result.multiplier * (1 + multiplierSum);
                }
            });

            // Apply the fixed 0.004 deduction
            const adjustedTotal = Math.max(0, timeBasedTotal + baseSum - 0.004);

            const totalSeconds = adjustedTotal * 3600;
            const wholeHours = Math.floor(adjustedTotal);
            const remainingSeconds = totalSeconds - (wholeHours * 3600);

            this.updateDisplay(adjustedTotal, remainingSeconds);
        } catch (error) {
            console.error('Calculation error:', error);
            this.updateDisplay(0, 0);
        }
    }

    updateDisplay(hours, seconds) {
        try {
            const formattedHours = hours.toLocaleString('en-US', {
                minimumFractionDigits: 3,
                maximumFractionDigits: 3
            });

            if (this.hoursResultElement) {
                this.hoursResultElement.textContent = `${formattedHours} Hours Saved`;
            }
            if (this.secondsResultElement) {
                this.secondsResultElement.textContent = `${seconds.toFixed(3)} seconds`;
            }
        } catch (error) {
            console.error('Display update error:', error);
        }
    }

    validateTimeValue(value) {
        let numValue = parseFloat(value);
        if (isNaN(numValue)) numValue = 0;
        if (numValue < 0) numValue = 0;
        if (numValue > 40) numValue = 40;
        return numValue;
    }
}

// Initialize calculator
const calculator = new CalculatorEngine();
