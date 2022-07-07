import unittest
import pytest

try:
    from .source import A
except ImportError:
    from source import A

class TestA(unittest.TestCase):
    def test_mya(self):
        a = A()
        self.assertEqual(a.my_a(), 1)

    @pytest.mark.master
    def test_mya2(self):
        a = A()
        self.assertEqual(a.my_a(), 1)